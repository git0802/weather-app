{ pkgs }: {
  deps = [
    pkgs.postgresql
    pkgs.nodePackages.prettier
  ];
}
