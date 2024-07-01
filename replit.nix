{ pkgs }: {
  deps = [
    pkgs.nodejs-14_x
    pkgs.yarn
  ];

  run = "yarn build && node server.mjs";
}