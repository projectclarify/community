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

### Signal transformation

TODO

### Augmentation

TODO

### Models

#### Non-deep learning approaches

TODO

#### ResNet

TODO

#### Reformer

TODO

## Evaluation metrics

Besides eval performance on the primary trained task we will make use of several additional means of evaluating model quality:

### Cross-modal FEC representation consistency

TODO

### Cross-modal state similarity triplets

TODO

## Qualitative evaluation

### Cross-modal image ranking

TODO

## References

1. Obeid, Iyad, and Joseph Picone. "The temple university hospital EEG data corpus." Frontiers in neuroscience 10 (2016): 196. [link](https://www.frontiersin.org/articles/10.3389/fnins.2016.00196/full)

