#!/bin/bash

git config user.name sahil-shubham
git config user.email sahil.shubham2000@gmail.com

# This checks if the latest commit message is of a release or not
if [ "Minor version bump;" != "$(git log -1 --pretty='%s')" ]; then
  yarn bump-version
  git add .
  git commit -m "Minor version bump;"
  git push
else
  exit 1
fi
