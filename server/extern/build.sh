#!/bin/bash -e


npm run build && npm run openBrowser && echo -e "\nBrowser open at current port" && read -rn1

