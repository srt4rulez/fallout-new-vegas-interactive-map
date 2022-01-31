#!/bin/bash

docker_image="node:16"
repo_name="fallout-new-vegas-interactive-map"

# https://docs.docker.com/engine/reference/commandline/run/
args=(
    # Keep STDIN open even if not attached
    --interactive

    # Allocate a pseudo-TTY
    --tty

    # Assign a name to the container
    --name "$repo_name"

    # Automatically remove the container when it exits
    --rm

    # Publish a container's port(s) to the host
    --publish 3000:3000 # create-react-app's default server port.

    # Bind mount a volume from the <host>:<container>
    --volume "$(pwd):/$repo_name" # mount the project directory to a directory of the repo name.

    # Working directory inside the container (the starting directory when the container runs)
    --workdir /"$repo_name"

    # Username or UID (format: <name|uid>[:<group|gid>])
    --user node

    # Set environment variables
    --env NODE_ENV=development
)

sudo docker run "${args[@]}" "$docker_image" /bin/bash
