import { BaseError, useAccount, useBalance, useChainId, useConnect, useDisconnect, useEnsName, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { formatEther, parseAbi, parseEther } from 'viem'
import { useState } from 'react';

const WETH_CONTRACT_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

function App() {  
  return (
    <>
      <Account />
      <Connect />
      <WrapUnwrapETH />
    </>
  )
}

function Account() {
  const account = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({
    address: account.address,
  })

  const { data: balance } = useBalance({ address: account.address })


  return (
    <div>
      <h2>Account</h2>

      <div>
        account: {account.address} {ensName}
        <br />
        chainId: {account.chainId}
        <br />
        status: {account.status}
      </div>

      {account.status !== 'disconnected' && (
        <button type="button" onClick={() => disconnect()}>
          Disconnect
        </button>
      )}
      {account.status === 'connected' && (
        <div>
          Balance :{' '}
          {!!balance?.value && formatEther(balance.value)}
        </div>
      )
      }
    </div>
  )
}

function Connect() {
  const chainId = useChainId()
  const { connectors, connect, status, error } = useConnect()

  return (
    <div>
      <h2>Connect</h2>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector, chainId })}
          type="button"
        >
          {connector.name}
        </button>
      ))}
      <div>{status}</div>
      <div>{error?.message}</div>
    </div>
  )
}

const WrapUnwrapETH = () => {
  const [amount, setAmount] = useState('');
  const [isWrapping, setIsWrapping] = useState(true); // Toggle between wrap and unwrap

  const { address } = useAccount();
  const { data: ethBalance } = useBalance({ address });
  const { data: wethBalance } = useBalance({ address, token: WETH_CONTRACT_ADDRESS });

  const { data: hash, error, isPending, writeContract } = useWriteContract()


  const handleTransaction = () => {
    if (isWrapping) {
      writeContract({
        address: WETH_CONTRACT_ADDRESS,
        abi: parseAbi(["function deposit() public payable"]),
        functionName: 'deposit',
        value: parseEther(amount || '0')
      })
    } else {
      writeContract({
        address: WETH_CONTRACT_ADDRESS,
        abi: parseAbi(["function withdraw(uint wad) public"]),
        functionName: 'withdraw',
        args: [parseEther(amount || '0')]
      })
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
  useWaitForTransactionReceipt({
    hash,
  })

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <h3>{isWrapping ? 'Pay with' : 'Receive'}</h3>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setIsWrapping(true)} style={{ backgroundColor: isWrapping ? '#0070f3' : '#000' }}>ETH</button>
        <button onClick={() => setIsWrapping(false)} style={{ backgroundColor: !isWrapping ? '#0070f3' : '#000' }}>WETH</button>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <p style={{ color: 'red' }}>Balance: {isWrapping ? ethBalance?.formatted : wethBalance?.formatted}</p>
      </div>

      <div>
        <button
          onClick={handleTransaction}
          disabled={!amount || parseFloat(amount) <= 0}
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {isPending ? 'Confirming...' : (isWrapping ? `Wrap ${amount} ETH to WETH` : `Unwrap ${amount} WETH to ETH`)}
        </button>
      </div>
      {isConfirming && 'Waiting for confirmation...'}
      {isConfirmed && 'Transaction confirmed.'}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </div>
  );
};


export default App
