#!/bin/bash

http-server ./resources -p 9091 &
browser-sync start --port '3200' --server 'src' --files 'src' --directory &
wait;



