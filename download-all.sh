#!/usr/bin/env bash

echo
echo 'OpenData Downloader v1.0'
echo 'https://opendata.rs'
echo

# 1

OD_SOURCE=data.gov.rs
OD_FILE=datasets.json

echo "> ${OD_SOURCE}"
cd ${OD_SOURCE}

http 'https://data.gov.rs/api/1/datasets/' page_size==1000 > ${OD_FILE}

next_page=$(cat ${OD_FILE} | jq '.next_page')
if [[ ${next_page} != "null" ]]; then
  echo "Error downloading ${OD_FILE}"
  return 1
fi

cd ..


# the end

echo "OK."
echo

