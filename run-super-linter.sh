#!/bin/bash

# Shell command to run the github super-linter with docker on the project.

docker_image="github/super-linter:slim-v4"

# https://docs.docker.com/engine/reference/commandline/run/
args=(
    # Automatically remove the container when it exits
    --rm

    # Bind mount a volume from the <host>:<container>
    --volume "$(pwd):/tmp/lint"

    # Set environment variables
    --env RUN_LOCAL=true

    # Same env vars as super linter github action. See .github/workflows/linter.yml
    --env VALIDATE_BASH=true
    --env VALIDATE_BASH_EXEC=true
    --env VALIDATE_EDITORCONFIG=true
    --env VALIDATE_GITHUB_ACTIONS=true
    --env VALIDATE_GITLEAKS=true
    --env VALIDATE_HTML=true
    --env VALIDATE_JSCPD=true
    --env VALIDATE_YAML=true
)

sudo docker run "${args[@]}" "$docker_image" /bin/bash
