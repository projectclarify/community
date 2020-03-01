<a href="https://colab.research.google.com/gist/cwbeitel/46f80c950a2f6cd943432d8d3115a9fd/untitled54.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

# Getting started with Trax

## Overview

In this getting started guide we get to know Trax and make a little progress towards being able to use the new Reformer architecture for large-scale sequence understanding.

After installing Trax we'll train a Reformer model to take in one string of text and output two copies of that same text (a simple "copy problem").

Learning objectives:

* See how to create your inputs from Python
* Learn basic use of the primary interface for training models with Trax, trax.Trainer
* Learn how to perform inference in this context.

Let's do the codelab! 🤓
 

## Setup trax

Let's get Trax set up! 🎉

From here on, when we provide code snippets you can go ahead and run those in your colab notebook.


```
! pip install -q -U trax
! pip install -q tensorflow

import os
import numpy as np
import trax
```

## Development inputs

In the course of development it can be really helpful to have a trivially simple source of input training examples to help us develop and debug our models! Here's a snippet for the copy task we mentioned earlier.


```
# Construct inputs, see one batch
def copy_task(batch_size, vocab_size, length):
  """This task is to copy a random string w, so the input is 0w0w."""
  while True:
    assert length % 2 == 0
    w_length = (length // 2) - 1
    w = np.random.randint(low=1, high=vocab_size-1,
                          size=(batch_size, w_length))
    zero = np.zeros([batch_size, 1], np.int32)
    loss_weights = np.concatenate([np.zeros((batch_size, w_length)),
                                   np.ones((batch_size, w_length+2))], axis=1)
    x = np.concatenate([zero, w, zero, w], axis=1)
    yield (x, x, loss_weights)  # Here inputs and targets are the same.
copy_inputs = trax.supervised.Inputs(lambda _: copy_task(16, 32, 10))

# Peek into the inputs.
data_stream = copy_inputs.train_stream(1)
inputs, targets, mask = next(data_stream)
print("Inputs[0]:  %s" % str(inputs[0]))
print("Targets[0]: %s" % str(targets[0]))
print("Mask[0]:    %s" % str(mask[0]))
```

## Configure the trainer

Now that we have some examples to work with let's go right ahead and train that model, shall we?


```
# Transformer LM
def tiny_transformer_lm(mode):
  return trax.models.TransformerLM(   # You can try trax_models.ReformerLM too.
    d_model=32, d_ff=128, n_layers=2, vocab_size=32, mode=mode)

# Train tiny model with Trainer.
output_dir = os.path.expanduser('~/train_dir/')
!rm -f ~/train_dir/model.pkl  # Remove old model.
trainer = trax.supervised.Trainer(
    model=tiny_transformer_lm,
    loss_fn=trax.layers.CrossEntropyLoss,
    optimizer=trax.optimizers.Adafactor,  # Change optimizer params here.
    lr_schedule=trax.lr.MultifactorSchedule,  # Change lr schedule here.
    inputs=copy_inputs,
    output_dir=output_dir,
    has_weights=True)  # Because we have loss mask, this API may change.

```

## Train the model

Time to train that model. Once we've configured it as above all we have to do is run an epoch loop. In this case we do three rounds of training and eval. In each round we train for `train_steps` and eval for `eval_steps` continuing on to train for `train_steps` in a subsequent epoch.


```
# Train for 3 epochs each consisting of 500 train batches, eval on 2 batches.
n_epochs  = 3
train_steps = 500
eval_steps = 2
for _ in range(n_epochs):
  trainer.train_epoch(train_steps, eval_steps)
```

The first 500 steps should take about 17s followed by about 3s for each of the two subsequent blocks of 500 training steps. While this runs you'll see output like the following that provides accuracy, loss, and other metrics for the model applied to both the training and evaluation data subsets:

```bash
Step    500: Ran 500 train steps in 16.51 secs
Step    500: Evaluation
Step    500: train                   accuracy |  0.53125000
Step    500: train                       loss |  1.83887446
Step    500: train         neg_log_perplexity | -1.83887446
Step    500: train weights_per_batch_per_core |  80.00000000
Step    500: eval                    accuracy |  0.52500004
Step    500: eval                        loss |  1.92791247
Step    500: eval          neg_log_perplexity | -1.92791247
Step    500: eval  weights_per_batch_per_core |  80.00000000
Step    500: Finished evaluation
```

## Setup inference

So we trained a model! Now we want to be able to use it for inference (i.e. to give it inputs and have it predict outputs that we've hopefully trained it to predict). To do so we need to initialize a version of the model in "predict" mode and populate that model with parameters we learned in the previous step (and that were saved to disk as `model.pkl` in the output directory).


```
# Initialize model for inference.
predict_model = tiny_transformer_lm(mode='predict')
predict_signature = trax.shapes.ShapeDtype((1,1), dtype=np.int32)
predict_model.init(predict_signature)
predict_model.init_from_file(os.path.join(output_dir, "model.pkl"),
                             weights_only=True)
# You can also do: predict_model.weights = trainer.model_weights

```

## Perform inference

We created a problem. We trained a model. We configured inference. This is the moment we have been building towards. It's time to make two copies of some input text!!!


```
# Run inference
prefix = [0, 1, 2, 3, 4, 0]   # Change non-0 digits to see if it's copying
cur_input = np.array([[0]])
result = []
for i in range(10):
  logits = predict_model(cur_input)
  next_input = np.argmax(logits[0, 0, :], axis=-1)
  if i < len(prefix) - 1:
    next_input = prefix[i]
  cur_input = np.array([[next_input]])
  result.append(int(next_input))  # Append to the result
print(result)
```

## Summary

Today we got Trax set up, made up our own set of training example, trained a transformer model on these, and ran inference!

You made it! The end of the codelab but the start of the journey.

Click [here]() to launch the next in this tutorial series!

