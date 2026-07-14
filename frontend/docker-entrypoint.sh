#!/bin/sh
set -eu
mkdir -p /frontend
rm -rf /frontend/*
cp -r /app/dist/. /frontend/
exec sleep infinity
