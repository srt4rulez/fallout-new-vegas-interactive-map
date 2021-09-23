sudo docker run \
    --interactive \
    --tty \
    --name fonv_im \
    --rm \
    --publish 3000:3000 \
    --volume "/$(pwd):/code" \
    --workdir /code \
    --user node \
    node:14 \
    /bin/bash
