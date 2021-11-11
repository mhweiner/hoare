#!/usr/bin/env bash

c8 --reporter text --reporter html ts-node dist/run.js $@
