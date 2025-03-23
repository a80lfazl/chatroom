#!/bin/bash

# Define an array of projects with their respective commands and directories
declare -A projects
projects["server"]="bun dev"
projects["frontend/web"]="bun dev"

# Loop through each project and execute the command in the specified directory
for cwd in "${!projects[@]}"; do
  command=${projects[$cwd]}
  
  # Run the command in the background and redirect output
  (
    cd "$cwd" || exit 1
    echo "Starting command in $cwd: $command"
    $command > >(while read -r line; do echo "[$cwd] $line"; done) 2> >(while read -r line; do echo "[$cwd] ERROR: $line" >&2; done)
  ) &
done

# Wait for all background jobs to finish
wait
