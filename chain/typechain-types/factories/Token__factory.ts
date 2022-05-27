/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Token, TokenInterface } from "../Token";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
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
    inputs: [],
    name: "name",
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
  {
    inputs: [],
    name: "owner",
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
    inputs: [],
    name: "symbol",
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
  {
    inputs: [],
    name: "totalSupply",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526040518060400160405280601081526020017f4d79204861726468617420546f6b656e000000000000000000000000000000008152506000908051906020019061004f92919061013c565b506040518060400160405280600381526020017f4d485400000000000000000000000000000000000000000000000000000000008152506001908051906020019061009b92919061013c565b50620f42406002553480156100af57600080fd5b50600254600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610240565b828054610148906101df565b90600052602060002090601f01602090048101928261016a57600085556101b1565b82601f1061018357805160ff19168380011785556101b1565b828001600101855582156101b1579182015b828111156101b0578251825591602001919060010190610195565b5b5090506101be91906101c2565b5090565b5b808211156101db5760008160009055506001016101c3565b5090565b600060028204905060018216806101f757607f821691505b6020821081141561020b5761020a610211565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b610a428061024f6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c806306fdde031461006757806318160ddd1461008557806370a08231146100a35780638da5cb5b146100d357806395d89b41146100f1578063a9059cbb1461010f575b600080fd5b61006f61012b565b60405161007c9190610734565b60405180910390f35b61008d6101b9565b60405161009a91906107e4565b60405180910390f35b6100bd60048036038101906100b8919061063a565b6101bf565b6040516100ca91906107e4565b60405180910390f35b6100db610208565b6040516100e89190610719565b60405180910390f35b6100f961022e565b6040516101069190610734565b60405180910390f35b61012960048036038101906101249190610663565b6102bc565b005b6000805461013890610914565b80601f016020809104026020016040519081016040528092919081815260200182805461016490610914565b80156101b15780601f10610186576101008083540402835291602001916101b1565b820191906000526020600020905b81548152906001019060200180831161019457829003601f168201915b505050505081565b60025481565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6001805461023b90610914565b80601f016020809104026020016040519081016040528092919081815260200182805461026790610914565b80156102b45780601f10610289576101008083540402835291602001916102b4565b820191906000526020600020905b81548152906001019060200180831161029757829003601f168201915b505050505081565b61033a6040518060400160405280601b81526020017f53656e6465722062616c616e636520697320257320746f6b656e730000000000815250600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546104ac565b61037a6040518060400160405280601e81526020017f547279696e6720746f2073656e6420257320746f6b656e7320746f20257300008152508284610548565b80600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156103fc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103f3906107c4565b60405180910390fd5b80600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461044b9190610871565b9250508190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546104a1919061081b565b925050819055505050565b61054482826040516024016104c2929190610756565b6040516020818303038152906040527f9710a9d0000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506105e7565b5050565b6105e283838360405160240161056093929190610786565b6040516020818303038152906040527fe3849f79000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506105e7565b505050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b60008135905061061f816109de565b92915050565b600081359050610634816109f5565b92915050565b60006020828403121561064c57600080fd5b600061065a84828501610610565b91505092915050565b6000806040838503121561067657600080fd5b600061068485828601610610565b925050602061069585828601610625565b9150509250929050565b6106a8816108a5565b82525050565b60006106b9826107ff565b6106c3818561080a565b93506106d38185602086016108e1565b6106dc816109a4565b840191505092915050565b60006106f460118361080a565b91506106ff826109b5565b602082019050919050565b610713816108d7565b82525050565b600060208201905061072e600083018461069f565b92915050565b6000602082019050818103600083015261074e81846106ae565b905092915050565b6000604082019050818103600083015261077081856106ae565b905061077f602083018461070a565b9392505050565b600060608201905081810360008301526107a081866106ae565b90506107af602083018561070a565b6107bc604083018461069f565b949350505050565b600060208201905081810360008301526107dd816106e7565b9050919050565b60006020820190506107f9600083018461070a565b92915050565b600081519050919050565b600082825260208201905092915050565b6000610826826108d7565b9150610831836108d7565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561086657610865610946565b5b828201905092915050565b600061087c826108d7565b9150610887836108d7565b92508282101561089a57610899610946565b5b828203905092915050565b60006108b0826108b7565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b838110156108ff5780820151818401526020810190506108e4565b8381111561090e576000848401525b50505050565b6000600282049050600182168061092c57607f821691505b602082108114156109405761093f610975565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b7f4e6f7420656e6f75676820746f6b656e73000000000000000000000000000000600082015250565b6109e7816108a5565b81146109f257600080fd5b50565b6109fe816108d7565b8114610a0957600080fd5b5056fea264697066735822122071ab28ea839a0e556eec55c051f83f2952358e0d2537c0f41a785c927558b74964736f6c63430008040033";

type TokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Token__factory extends ContractFactory {
  constructor(...args: TokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Token> {
    return super.deploy(overrides || {}) as Promise<Token>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Token {
    return super.attach(address) as Token;
  }
  override connect(signer: Signer): Token__factory {
    return super.connect(signer) as Token__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenInterface {
    return new utils.Interface(_abi) as TokenInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Token {
    return new Contract(address, _abi, signerOrProvider) as Token;
  }
}
