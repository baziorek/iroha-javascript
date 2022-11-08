@Library('jenkins-library' )

def pipeline = new org.js.LibPipeline( steps: this,
    packageManager: "pnpm",
    buildDockerImage: 'build-tools/node:14-pnpm7-2',
    libPushBranches: ['iroha2'],
    npmRegistries: ['https://nexus.iroha.tech/repository/npm-soramitsu/': 'bot-soramitsu-rw'],
    preBuildCmds: ['rm -rf ~/.cargo/registry', 'npm install -g n','n 16.17.0', 'n prune', 'pnpm install --unsafe-perm'],
    testCmds: ['pnpm type-check','pnpm lint','pnpm test'],
    pushCmds: ['npm config set registry "https://nexus.iroha.tech/repository/npm-soramitsu/"', 'pnpm jake publish-all'],
    secretScannerExclusion: '.*Cargo.toml\$|.*README.md\$'
   )
pipeline.runPipeline()
