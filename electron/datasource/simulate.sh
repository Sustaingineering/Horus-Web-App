#!/bin/bash

set -e 

MAX_VOLTAGE=5
MAX_CURRENT=3
MAX_TEMP_A=100
MAX_TEMP_B=100
# MAX_POWER= the meaning of the power variable is not yet defined

if [[ -z $SLEEP_SECONDS ]]
then
    echo "mandatory env var SLEEP_SECONDS not set"
    exit 1
fi

if [[ -z $FILENAME ]]
then
    echo "mandatory env var FILENAME not set"
    exit 1
fi


while true
do
    voltage=$(($RANDOM%($MAX_VOLTAGE+1)))
    current=$(($RANDOM%($MAX_CURRENT+1)))
    temp_a=$(($RANDOM%($MAX_TEMP_A+1)))
    temp_b=$(($RANDOM%($MAX_TEMP_B+1)))
    power=$(($voltage*$current))
    water_breaker=$(($RANDOM%2))
    pump_id="A2A" #fixme
    echo $voltage.$(($RANDOM%10)),$current.$(($RANDOM%10)),$temp_a.$(($RANDOM%10)),$temp_b,$power.$(($RANDOM%10)),$water_breaker,\"$pump_id\" >> $FILENAME
    sleep $SLEEP_SECONDS
done
