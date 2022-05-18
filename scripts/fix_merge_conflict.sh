#!/usr/bin/env sh

current_branch=$(git branch --show-current)
git merge master
python ./scripts/generate_apps_package.py
yarn install
git add .
git commit -m "Merge branch 'master' into $current_branch"