#!/bin/bash

while true
do
    node deploy-commands.js
    sleep 3 
    node index.js
    sleep 10
done
