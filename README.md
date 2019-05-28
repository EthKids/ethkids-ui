# ethkids-ui

## Project setup
```
npm install
```
In order to find the **EthKids Solidity contracts** you need to point them in 
`src/store.js`

and provide

```
//address of EthKidsRegistry contract that holds the list registered communities
registryAddress: '0x95e8e2D4D5E427f1620aF7264B6B79e2fAeFb8A0',

//block no. when it was created
communityCreationBlock: 4455521,

//Rinkeby? Mainnet?
requiredNetwork: 4,
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
