#!/bin/bash

git config user.name sahil-shubham
git config user.email sahil.shubham2000@gmail.com

# This checks if the latest commit message is of a release or not
if [ "$(git describe --tags --abbrev=0)" != "$(git log -1 --pretty='%s')" ]; then
  yarn bump-version
  git push --follow-tags
else
  exit 1
fi
