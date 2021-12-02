enum EStateMutability {
  VIEW = 'view',
  NONPAYABLE = 'nonpayable',
  PAYABLE = 'payable',
}

enum EType {
  UINT256 = 'uint256',
  ADDRESS = 'address',
  STRING = 'string',
  BOOLEAN = 'bool',
  BYTES = 'bytes',
  ARRAY = 'array',
  MAPPING = 'mapping',
  INTERFACE = 'interface',
  FUNCTION = 'function',
  STRUCT = 'struct',
  ENUM = 'enum',
  INTERNAL = 'internal',
}

export { EStateMutability, EType };
