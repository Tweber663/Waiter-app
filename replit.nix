{ pkgs }: {
  deps = [
    pkgs.nodejs-14_x,
    pkgs.yarn
  ];

  run = "yarn install && yarn build && node server.mjs";
}