#!/bin/bash


python -m SimpleHttpServer 7070 --directory /dist && npm run buildProject //&& npm run buildElectron