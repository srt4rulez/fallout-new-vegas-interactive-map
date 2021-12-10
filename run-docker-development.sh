sudo docker run \
    --interactive \
    --tty \
    --name fallout-new-vegas-interactive-map \
    --rm \
    --publish 3000:3000 \
    --volume "/$(pwd):/fallout-new-vegas-interactive-map" \
    --workdir /fallout-new-vegas-interactive-map \
    --user node \
    --env NODE_ENV=development \
    node:14 \
    /bin/bash
