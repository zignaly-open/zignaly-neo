#!/bin/bash

if ! test -f "$HOME/.nvm"; then
  # install nodejs if we do not have it
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
  nvm install 20
  nvm use 20
  npm i -g pm2
  npm i -g yarn
fi

#DEPLOYMENTPATH="/zignaly/{directory}"
#sudo mkdir -p $DEPLOYMENTPATH/deploy
