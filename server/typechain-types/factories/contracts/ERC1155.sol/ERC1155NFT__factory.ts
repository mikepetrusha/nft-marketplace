/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  ERC1155NFT,
  ERC1155NFTInterface,
} from "../../../contracts/ERC1155.sol/ERC1155NFT";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "marketplaceAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
    ],
    name: "tokenCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "createToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052604051806020016040528060008152506003908162000024919062000351565b503480156200003257600080fd5b5060405162003303380380620033038339818101604052810190620000589190620004a2565b604051806020016040528060008152506200007981620000c260201b60201c565b5080600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050620004d4565b8060029081620000d3919062000351565b5050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200015957607f821691505b6020821081036200016f576200016e62000111565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620001d97fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200019a565b620001e586836200019a565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620002326200022c6200022684620001fd565b62000207565b620001fd565b9050919050565b6000819050919050565b6200024e8362000211565b620002666200025d8262000239565b848454620001a7565b825550505050565b600090565b6200027d6200026e565b6200028a81848462000243565b505050565b5b81811015620002b257620002a660008262000273565b60018101905062000290565b5050565b601f8211156200030157620002cb8162000175565b620002d6846200018a565b81016020851015620002e6578190505b620002fe620002f5856200018a565b8301826200028f565b50505b505050565b600082821c905092915050565b6000620003266000198460080262000306565b1980831691505092915050565b600062000341838362000313565b9150826002028217905092915050565b6200035c82620000d7565b67ffffffffffffffff811115620003785762000377620000e2565b5b62000384825462000140565b62000391828285620002b6565b600060209050601f831160018114620003c95760008415620003b4578287015190505b620003c0858262000333565b86555062000430565b601f198416620003d98662000175565b60005b828110156200040357848901518255600182019150602085019450602081019050620003dc565b868310156200042357848901516200041f601f89168262000313565b8355505b6001600288020188555050505b505050505050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200046a826200043d565b9050919050565b6200047c816200045d565b81146200048857600080fd5b50565b6000815190506200049c8162000471565b92915050565b600060208284031215620004bb57620004ba62000438565b5b6000620004cb848285016200048b565b91505092915050565b612e1f80620004e46000396000f3fe608060405234801561001057600080fd5b506004361061009d5760003560e01c80634e1273f4116100665780634e1273f41461016a578063a22cb4651461019a578063e985e9c5146101b6578063f242432a146101e6578063f6b4dfb4146102025761009d565b8062fdd58e146100a257806301ffc9a7146100d25780630e89341c146101025780632eb2c2d61461013257806345576f941461014e575b600080fd5b6100bc60048036038101906100b791906117e0565b610220565b6040516100c9919061182f565b60405180910390f35b6100ec60048036038101906100e791906118a2565b6102e8565b6040516100f991906118ea565b60405180910390f35b61011c60048036038101906101179190611905565b6103ca565b60405161012991906119c2565b60405180910390f35b61014c60048036038101906101479190611be1565b6104af565b005b61016860048036038101906101639190611d51565b610550565b005b610184600480360381019061017f9190611e5d565b6105ec565b6040516101919190611f93565b60405180910390f35b6101b460048036038101906101af9190611fe1565b610705565b005b6101d060048036038101906101cb9190612021565b61071b565b6040516101dd91906118ea565b60405180910390f35b61020060048036038101906101fb9190612061565b6107af565b005b61020a610850565b6040516102179190612107565b60405180910390f35b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610290576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161028790612194565b60405180910390fd5b60008083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806103b357507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806103c357506103c282610876565b5b9050919050565b606060006004600084815260200190815260200160002080546103ec906121e3565b80601f0160208091040260200160405190810160405280929190818152602001828054610418906121e3565b80156104655780601f1061043a57610100808354040283529160200191610465565b820191906000526020600020905b81548152906001019060200180831161044857829003601f168201915b5050505050905060008151116104835761047e836108e0565b6104a7565b6003816040516020016104979291906122e8565b6040516020818303038152906040525b915050919050565b6104b7610974565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614806104fd57506104fc856104f7610974565b61071b565b5b61053c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105339061237e565b60405180910390fd5b610549858585858561097c565b5050505050565b61055a6005610c9d565b60006105666005610cb3565b90506105843382600160405180602001604052806000815250610cc1565b61058e8183610e71565b6105bb600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166001610705565b807f0a6b2a25f2764bb23ba81dc1f3c7e5885291c116a26ba73b46c15ed49483174160405160405180910390a25050565b60608151835114610632576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161062990612410565b60405180910390fd5b6000835167ffffffffffffffff81111561064f5761064e6119e9565b5b60405190808252806020026020018201604052801561067d5781602001602082028036833780820191505090505b50905060005b84518110156106fa576106ca8582815181106106a2576106a1612430565b5b60200260200101518583815181106106bd576106bc612430565b5b6020026020010151610220565b8282815181106106dd576106dc612430565b5b602002602001018181525050806106f39061248e565b9050610683565b508091505092915050565b610717610710610974565b8383610ed6565b5050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6107b7610974565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614806107fd57506107fc856107f7610974565b61071b565b5b61083c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108339061237e565b60405180910390fd5b6108498585858585611042565b5050505050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6060600280546108ef906121e3565b80601f016020809104026020016040519081016040528092919081815260200182805461091b906121e3565b80156109685780601f1061093d57610100808354040283529160200191610968565b820191906000526020600020905b81548152906001019060200180831161094b57829003601f168201915b50505050509050919050565b600033905090565b81518351146109c0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109b790612548565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610a2f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a26906125da565b60405180910390fd5b6000610a39610974565b9050610a498187878787876112dd565b60005b8451811015610bfa576000858281518110610a6a57610a69612430565b5b602002602001015190506000858381518110610a8957610a88612430565b5b60200260200101519050600080600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610b2a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b219061266c565b60405180910390fd5b81810360008085815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160008085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610bdf919061268c565b9250508190555050505080610bf39061248e565b9050610a4c565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610c719291906126c0565b60405180910390a4610c878187878787876112e5565b610c958187878787876112ed565b505050505050565b6001816000016000828254019250508190555050565b600081600001549050919050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610d30576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d2790612769565b60405180910390fd5b6000610d3a610974565b90506000610d47856114c4565b90506000610d54856114c4565b9050610d65836000898585896112dd565b8460008088815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610dc4919061268c565b925050819055508673ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628989604051610e42929190612789565b60405180910390a4610e59836000898585896112e5565b610e688360008989898961153e565b50505050505050565b80600460008481526020019081526020016000209081610e919190612949565b50817f6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b610ebd846103ca565b604051610eca91906119c2565b60405180910390a25050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610f44576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f3b90612a8d565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405161103591906118ea565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036110b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110a8906125da565b60405180910390fd5b60006110bb610974565b905060006110c8856114c4565b905060006110d5856114c4565b90506110e58389898585896112dd565b600080600088815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508581101561117c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111739061266c565b60405180910390fd5b85810360008089815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508560008089815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611231919061268c565b925050819055508773ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628a8a6040516112ae929190612789565b60405180910390a46112c4848a8a86868a6112e5565b6112d2848a8a8a8a8a61153e565b505050505050505050565b505050505050565b505050505050565b61130c8473ffffffffffffffffffffffffffffffffffffffff16611715565b156114bc578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b8152600401611352959493929190612b02565b6020604051808303816000875af192505050801561138e57506040513d601f19601f8201168201806040525081019061138b9190612b7f565b60015b6114335761139a612bb9565b806308c379a0036113f657506113ae612bdb565b806113b957506113f8565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113ed91906119c2565b60405180910390fd5b505b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161142a90612cdd565b60405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146114ba576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114b190612d6f565b60405180910390fd5b505b505050505050565b60606000600167ffffffffffffffff8111156114e3576114e26119e9565b5b6040519080825280602002602001820160405280156115115781602001602082028036833780820191505090505b509050828160008151811061152957611528612430565b5b60200260200101818152505080915050919050565b61155d8473ffffffffffffffffffffffffffffffffffffffff16611715565b1561170d578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b81526004016115a3959493929190612d8f565b6020604051808303816000875af19250505080156115df57506040513d601f19601f820116820180604052508101906115dc9190612b7f565b60015b611684576115eb612bb9565b806308c379a00361164757506115ff612bdb565b8061160a5750611649565b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161163e91906119c2565b60405180910390fd5b505b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161167b90612cdd565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461170b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161170290612d6f565b60405180910390fd5b505b505050505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006117778261174c565b9050919050565b6117878161176c565b811461179257600080fd5b50565b6000813590506117a48161177e565b92915050565b6000819050919050565b6117bd816117aa565b81146117c857600080fd5b50565b6000813590506117da816117b4565b92915050565b600080604083850312156117f7576117f6611742565b5b600061180585828601611795565b9250506020611816858286016117cb565b9150509250929050565b611829816117aa565b82525050565b60006020820190506118446000830184611820565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61187f8161184a565b811461188a57600080fd5b50565b60008135905061189c81611876565b92915050565b6000602082840312156118b8576118b7611742565b5b60006118c68482850161188d565b91505092915050565b60008115159050919050565b6118e4816118cf565b82525050565b60006020820190506118ff60008301846118db565b92915050565b60006020828403121561191b5761191a611742565b5b6000611929848285016117cb565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561196c578082015181840152602081019050611951565b60008484015250505050565b6000601f19601f8301169050919050565b600061199482611932565b61199e818561193d565b93506119ae81856020860161194e565b6119b781611978565b840191505092915050565b600060208201905081810360008301526119dc8184611989565b905092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611a2182611978565b810181811067ffffffffffffffff82111715611a4057611a3f6119e9565b5b80604052505050565b6000611a53611738565b9050611a5f8282611a18565b919050565b600067ffffffffffffffff821115611a7f57611a7e6119e9565b5b602082029050602081019050919050565b600080fd5b6000611aa8611aa384611a64565b611a49565b90508083825260208201905060208402830185811115611acb57611aca611a90565b5b835b81811015611af45780611ae088826117cb565b845260208401935050602081019050611acd565b5050509392505050565b600082601f830112611b1357611b126119e4565b5b8135611b23848260208601611a95565b91505092915050565b600080fd5b600067ffffffffffffffff821115611b4c57611b4b6119e9565b5b611b5582611978565b9050602081019050919050565b82818337600083830152505050565b6000611b84611b7f84611b31565b611a49565b905082815260208101848484011115611ba057611b9f611b2c565b5b611bab848285611b62565b509392505050565b600082601f830112611bc857611bc76119e4565b5b8135611bd8848260208601611b71565b91505092915050565b600080600080600060a08688031215611bfd57611bfc611742565b5b6000611c0b88828901611795565b9550506020611c1c88828901611795565b945050604086013567ffffffffffffffff811115611c3d57611c3c611747565b5b611c4988828901611afe565b935050606086013567ffffffffffffffff811115611c6a57611c69611747565b5b611c7688828901611afe565b925050608086013567ffffffffffffffff811115611c9757611c96611747565b5b611ca388828901611bb3565b9150509295509295909350565b600067ffffffffffffffff821115611ccb57611cca6119e9565b5b611cd482611978565b9050602081019050919050565b6000611cf4611cef84611cb0565b611a49565b905082815260208101848484011115611d1057611d0f611b2c565b5b611d1b848285611b62565b509392505050565b600082601f830112611d3857611d376119e4565b5b8135611d48848260208601611ce1565b91505092915050565b600060208284031215611d6757611d66611742565b5b600082013567ffffffffffffffff811115611d8557611d84611747565b5b611d9184828501611d23565b91505092915050565b600067ffffffffffffffff821115611db557611db46119e9565b5b602082029050602081019050919050565b6000611dd9611dd484611d9a565b611a49565b90508083825260208201905060208402830185811115611dfc57611dfb611a90565b5b835b81811015611e255780611e118882611795565b845260208401935050602081019050611dfe565b5050509392505050565b600082601f830112611e4457611e436119e4565b5b8135611e54848260208601611dc6565b91505092915050565b60008060408385031215611e7457611e73611742565b5b600083013567ffffffffffffffff811115611e9257611e91611747565b5b611e9e85828601611e2f565b925050602083013567ffffffffffffffff811115611ebf57611ebe611747565b5b611ecb85828601611afe565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b611f0a816117aa565b82525050565b6000611f1c8383611f01565b60208301905092915050565b6000602082019050919050565b6000611f4082611ed5565b611f4a8185611ee0565b9350611f5583611ef1565b8060005b83811015611f86578151611f6d8882611f10565b9750611f7883611f28565b925050600181019050611f59565b5085935050505092915050565b60006020820190508181036000830152611fad8184611f35565b905092915050565b611fbe816118cf565b8114611fc957600080fd5b50565b600081359050611fdb81611fb5565b92915050565b60008060408385031215611ff857611ff7611742565b5b600061200685828601611795565b925050602061201785828601611fcc565b9150509250929050565b6000806040838503121561203857612037611742565b5b600061204685828601611795565b925050602061205785828601611795565b9150509250929050565b600080600080600060a0868803121561207d5761207c611742565b5b600061208b88828901611795565b955050602061209c88828901611795565b94505060406120ad888289016117cb565b93505060606120be888289016117cb565b925050608086013567ffffffffffffffff8111156120df576120de611747565b5b6120eb88828901611bb3565b9150509295509295909350565b6121018161176c565b82525050565b600060208201905061211c60008301846120f8565b92915050565b7f455243313135353a2061646472657373207a65726f206973206e6f742061207660008201527f616c6964206f776e657200000000000000000000000000000000000000000000602082015250565b600061217e602a8361193d565b915061218982612122565b604082019050919050565b600060208201905081810360008301526121ad81612171565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806121fb57607f821691505b60208210810361220e5761220d6121b4565b5b50919050565b600081905092915050565b60008190508160005260206000209050919050565b60008154612241816121e3565b61224b8186612214565b94506001821660008114612266576001811461227b576122ae565b60ff19831686528115158202860193506122ae565b6122848561221f565b60005b838110156122a657815481890152600182019150602081019050612287565b838801955050505b50505092915050565b60006122c282611932565b6122cc8185612214565b93506122dc81856020860161194e565b80840191505092915050565b60006122f48285612234565b915061230082846122b7565b91508190509392505050565b7f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60008201527f6572206f7220617070726f766564000000000000000000000000000000000000602082015250565b6000612368602e8361193d565b91506123738261230c565b604082019050919050565b600060208201905081810360008301526123978161235b565b9050919050565b7f455243313135353a206163636f756e747320616e6420696473206c656e67746860008201527f206d69736d617463680000000000000000000000000000000000000000000000602082015250565b60006123fa60298361193d565b91506124058261239e565b604082019050919050565b60006020820190508181036000830152612429816123ed565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612499826117aa565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036124cb576124ca61245f565b5b600182019050919050565b7f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060008201527f6d69736d61746368000000000000000000000000000000000000000000000000602082015250565b600061253260288361193d565b915061253d826124d6565b604082019050919050565b6000602082019050818103600083015261256181612525565b9050919050565b7f455243313135353a207472616e7366657220746f20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b60006125c460258361193d565b91506125cf82612568565b604082019050919050565b600060208201905081810360008301526125f3816125b7565b9050919050565b7f455243313135353a20696e73756666696369656e742062616c616e636520666f60008201527f72207472616e7366657200000000000000000000000000000000000000000000602082015250565b6000612656602a8361193d565b9150612661826125fa565b604082019050919050565b6000602082019050818103600083015261268581612649565b9050919050565b6000612697826117aa565b91506126a2836117aa565b92508282019050808211156126ba576126b961245f565b5b92915050565b600060408201905081810360008301526126da8185611f35565b905081810360208301526126ee8184611f35565b90509392505050565b7f455243313135353a206d696e7420746f20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b600061275360218361193d565b915061275e826126f7565b604082019050919050565b6000602082019050818103600083015261278281612746565b9050919050565b600060408201905061279e6000830185611820565b6127ab6020830184611820565b9392505050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026127ff7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826127c2565b61280986836127c2565b95508019841693508086168417925050509392505050565b6000819050919050565b600061284661284161283c846117aa565b612821565b6117aa565b9050919050565b6000819050919050565b6128608361282b565b61287461286c8261284d565b8484546127cf565b825550505050565b600090565b61288961287c565b612894818484612857565b505050565b5b818110156128b8576128ad600082612881565b60018101905061289a565b5050565b601f8211156128fd576128ce8161221f565b6128d7846127b2565b810160208510156128e6578190505b6128fa6128f2856127b2565b830182612899565b50505b505050565b600082821c905092915050565b600061292060001984600802612902565b1980831691505092915050565b6000612939838361290f565b9150826002028217905092915050565b61295282611932565b67ffffffffffffffff81111561296b5761296a6119e9565b5b61297582546121e3565b6129808282856128bc565b600060209050601f8311600181146129b357600084156129a1578287015190505b6129ab858261292d565b865550612a13565b601f1984166129c18661221f565b60005b828110156129e9578489015182556001820191506020850194506020810190506129c4565b86831015612a065784890151612a02601f89168261290f565b8355505b6001600288020188555050505b505050505050565b7f455243313135353a2073657474696e6720617070726f76616c2073746174757360008201527f20666f722073656c660000000000000000000000000000000000000000000000602082015250565b6000612a7760298361193d565b9150612a8282612a1b565b604082019050919050565b60006020820190508181036000830152612aa681612a6a565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000612ad482612aad565b612ade8185612ab8565b9350612aee81856020860161194e565b612af781611978565b840191505092915050565b600060a082019050612b1760008301886120f8565b612b2460208301876120f8565b8181036040830152612b368186611f35565b90508181036060830152612b4a8185611f35565b90508181036080830152612b5e8184612ac9565b90509695505050505050565b600081519050612b7981611876565b92915050565b600060208284031215612b9557612b94611742565b5b6000612ba384828501612b6a565b91505092915050565b60008160e01c9050919050565b600060033d1115612bd85760046000803e612bd5600051612bac565b90505b90565b600060443d10612c6857612bed611738565b60043d036004823e80513d602482011167ffffffffffffffff82111715612c15575050612c68565b808201805167ffffffffffffffff811115612c335750505050612c68565b80602083010160043d038501811115612c50575050505050612c68565b612c5f82602001850186611a18565b82955050505050505b90565b7f455243313135353a207472616e7366657220746f206e6f6e2d4552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b6000612cc760348361193d565b9150612cd282612c6b565b604082019050919050565b60006020820190508181036000830152612cf681612cba565b9050919050565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b6000612d5960288361193d565b9150612d6482612cfd565b604082019050919050565b60006020820190508181036000830152612d8881612d4c565b9050919050565b600060a082019050612da460008301886120f8565b612db160208301876120f8565b612dbe6040830186611820565b612dcb6060830185611820565b8181036080830152612ddd8184612ac9565b9050969550505050505056fea264697066735822122012aa0db8b6734dcdb86703f7e3d5f1ea6069f06326399d12c4e6530c657943b164736f6c63430008130033";

type ERC1155NFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155NFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155NFT__factory extends ContractFactory {
  constructor(...args: ERC1155NFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    marketplaceAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(marketplaceAddress, overrides || {});
  }
  override deploy(
    marketplaceAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(marketplaceAddress, overrides || {}) as Promise<
      ERC1155NFT & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC1155NFT__factory {
    return super.connect(runner) as ERC1155NFT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155NFTInterface {
    return new Interface(_abi) as ERC1155NFTInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): ERC1155NFT {
    return new Contract(address, _abi, runner) as unknown as ERC1155NFT;
  }
}
