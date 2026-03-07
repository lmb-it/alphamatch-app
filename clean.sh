#!/bin/bash
set -e

echo "── Cleaning node_modules & lock files ──"
rm -rf node_modules
rm -f yarn.lock package-lock.json

echo "── Cleaning iOS ──"
rm -rf ios/Pods
rm -f ios/Podfile.lock
rm -rf ios/build
rm -rf ios/AlphaMatch.xcworkspace

echo "── Cleaning Android ──"
rm -rf android/build
rm -rf android/app/build
rm -rf android/.gradle

echo "── Installing JS dependencies ──"
yarn install

echo "── Installing CocoaPods ──"
cd ios && pod install && cd ..

echo "✓ Done"
