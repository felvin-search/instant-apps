#!/usr/bin/env sh

current_branch=$(git branch --show-current)
git merge branch1
python generate_boilerplate.py
yarn install
git add .
git commit -m "Merge branch 'master' into $current_branch"