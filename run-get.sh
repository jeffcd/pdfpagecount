#! /bin/bash

BUCKET=$1
PREFIX=$2

test -z "$BUCKET" && echo Missing bucket as first argument. && exit 1
test -z "$PREFIX" && echo Missing prefix as second argument. && exit 1

node get.js $BUCKET $PREFIX
if [ $? -eq 0 ]; then
  tar -czpf pdfs.tgz pdfs
  rm -rf pdfs
fi