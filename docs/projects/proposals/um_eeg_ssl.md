# Unimodal EEG SSL

**Self-supervised learning in the EEG domain**

@vrishabmadduri @Elkia-Federation @d-bi @saarangp @jerryx99 @anacis @rhotter @alfredo @cwbeitel

# Abstract

In domains where labels are hard to obtain self-supervised learning has shown promise as a means of learning useful representations (whether independently or in advance of learning to label). The EEG domain is indeed one where both data and labels are hard to obtain as well as which presents challenges for signal processing - notably that arise as signals propogate from the cortex through various defracting media to detectors placed exterior to the cortical space. We week to use SSL and other signal processing methods to learn representations of a user's state that exceed what we can obtain from expression understanding alone. We seek to do this using large volumes of open EEG datasets. And we seek to translate the result into a useful user experience.

- **Goal**: Improve users mental effectiveness by learning better state representations that can then be used for feedback.
- **Methods**: Self-supervised learning applied to large EEG datasets; application of data augmentation, signal transformation, and modeling methods amenable to the domain.
- **Evaluation**: Improvement on self-supervised problem itself, label consistency, cross-modal FEC-model embedding consistency, potentially crowd-sourced annotations of images in multimodal EEG/image dataset.
- **Experiments**: Efficacy of model alternatives, problem alternatives, sig. proc. alternatives vis these means of eval.
- **Qualitative**: Cross-modal similarity ranking of images for EEG signals, use in a live feedback experience with data from consumer headset.

## Datasets

All personnel handling clinical data will first be trained in the use of relevant protocols and systems.

### Simulation

Many of the available datasets are complex to navigate in many regards. When it comes time to debug models we will want a ground-truth that we can rely upon. In the context of image understanding, we can easily rely on the semantic labels of human annotators. Further in that domain, model performance can be characterized in terms of variation across label subsets which are not as available in the EEG domain.

To provide a most accessible alternative for the EEG domain we will make use of open source EEG simulation tools to simulate signals of a variety of types. Representations of these can be characterized, for example, in regard to how consistent proximities of learned representations are of some engineered metric of similarity according to simulated characteristics.

TODO: Survey of existing EEG sim tools.

### TUH-EEG Corpus

Obeid, Iyad, and Picone (2016)

#### Dataset notes

- Clinical EEG from archival records at Temple University Hospital.
- PHI-scrubbed clinician reports providing the means to derive labels such as via string matching to "eplipeps*", "concus*", or "stroke". 
- 16,986 sessions from 10,874 unique subjects with a corpus expansion rate of ~2,500 sessions per year
- 51% female
- 1 year to over 90, u 51.6, sd 55.9
- avg 1.56 sessions per patient
- variation in channel number 
- Some recording include supplementary channels (e.g. EKG, EMG)
- various sampling rates (8.3% 256hz, 3.8% 400hz, 1% 500hz)
- [Download here](https://www.isip.piconepress.com/projects/tuh_eeg/downloads/tuh_eeg/) (requires auth)

#### Subcorpuses

[Events corpus](https://www.isip.piconepress.com/projects/tuh_eeg/downloads/tuh_eeg_events/) labels:

- SPSW - spike and/or sharp waves
- PLED - periodic lateralized epileptiform discharges
- GPED - generalized periodic epileptiform discharges
- ARTF - artifacts
- EYEM - eye movements
- BCKG - background

[Artifacts corpus](https://www.isip.piconepress.com/projects/tuh_eeg/downloads/tuh_eeg_artifact/) labels:

- EYEM - eye movement
- CHEW - chewing
- SHIV - shivering
- ELPP - electrode pop, electrode static, and lead artifacts
- MUSC - muscle artifacts

### Multimodal datasets

The DEAP dataset includes data from 32 participants each watching 40 one-minute music video which they rated according to arousal, valence, like/dislike, dominance, and familiarity. A subset of 22 participants had frontal face video recorded in sync with EEG (32 channels) and various peripheral physiological measures including electrooculography, electromyography, galvanic skin response, blood volume pressure, skin temperature, and respiration amplitude. Similarly the MAHNOB-HCI tagging database includes data from 30 participants who were shown fragments of movies and pictures while being monitored with six perspectives of video, audio, eye tracking, ECG, EEG (32 channel), respiration amplitude, and skin temperature. Acquisition was separated into two phases during the first of which subjects were asked to annotate their own emotional state followed by annotating the consistency of a label with the provided content in the second phase.

## Methods

### Augmentation

EEG-domain analogs of data augmentation techniques standard in other domains will be applied. As the purpose for these techniques is to improve generalization they should be designed around obscuring signal dimensions beyond which we hope to generalize. For example, in the simplest case, if we wish to be able to generalize beyond the exact numerical values of a particular acquisition we may add gaussian noise or introduce simple mean shifting.

If we wish to learn representations that are less dependent on data from individual electrodes we can apply whole or partial electrode signal dropout (the time-series analog of black patch augmentation).

If we wish to learn representations that are wholly agnostic to electrode positioning or number we may wish to experiment with the combination of this together with random electrode shuffling without downstream signal preprocessing - simply feeding a random re-ordering of the electrode signal list into the modeling function to determine a representation without knowing the electrode the data came from.

### Self-suprvised problems

#### Triplet similarity

TODO: Given a triplet of electrode signal samples (e.g. a vector of like 1-2s of signal), predict which two out of the three are acquired closer in time or space. This problem can ratchet in regard to the level of distinction needed especially in the time dimension (e.g. initially learn with recognizing two adjacent signals are different from one acquired minutes later then later three signals over a short period where two are slightly closer than a third).

A useful loss to consider in this context would be one like we are using in the parallel FEx understanding / FEC work that is agnostic to distances beyond a certain threshold such that far distances in irrelevant regions don't dilute signal regarding fine distinctions in relevant ones.

#### Individual or contextual prediction

One class of SSL problem would involve the prediction of EEG signal, whether into the future (forecasting) or considering future signal as context (in-painting).

Forecasting: Given signal from a randomly selected single electrode, forcast a vector of values for that electrode. Alternatively, provided a vector of query electrode measurements together with measurements of neighbors, forecast the measurements of the query electrode.

In-painting: Given individual or context of electrodes predict signal that in-paints a zeroed or distorted section of signal.

### Signal transformation

One method of signal transformation we will employ will be the transformation of EEG signals into the form of, intuitively, "heatmap videos".

TODO: Describe exactly what methods we'll try in this regard.

These methods will be compared with those that apply no transformation to the input signal.

### Models

TODO: If a non-deep-learning approach is planned, include it here.

#### ResNet

TODO

#### Reformer

TODO

## Evaluation metrics

Besides eval performance on the primary trained task we will make use of several additional means of evaluating model quality by way of cross-modal image representations. These will be obtained by applying the EEG embedding model to the EEG portion of samples from a multi-modal (EEG + image + ...) dataset then associating the obtained embedding with the image portion of the multi-modal sample.

### Cross-modal FEC representation consistency

Given our previous work training models on the FEC dataset for expression embedding we have the means to compare embeddings produced from those models to ones preoduced by way of the cross-modal representation swapping method described above. This can involve a triplet-based similarity metric or something simpler like a pairwise comparison of distances. One challenge with the latter may be that accuracy of near distances may be washed out in irrelevant variation in far distances perhaps indicating the former as a preferable approach.

### Cross-modal state similarity triplets

If funds and clinical data usage approvals allow, we may obtain similarity labels for triplets of images obtained from multimodal datasets. The procedure for this will exactly parallel that of the construction of the Facial Expression Correspondence (FEC) dataset but be performed at a far smaller scale (possibly by us ourselves). Both having such annotations as well as having cross-modality representations described as above we can compute a metric of the similarity of distances of the learned representations and assigned similarity labels in an identical manner as is being used in our ongoing image FEC work.

## Qualitative evaluation

Cross-modality image representations can be used for qualitative analysis using standard methods for this in the image domain
(e.g. similarity lookup, tSNE embedding with image glyphs, etc.).

## Distribution of labor

TBD, please leave as such until an initial draft is complete.

## References

1. Obeid, Iyad, and Joseph Picone. "The temple university hospital EEG data corpus." Frontiers in neuroscience 10 (2016): 196. [link](https://www.frontiersin.org/articles/10.3389/fnins.2016.00196/full)

