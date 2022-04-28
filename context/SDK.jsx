/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Magic} from 'magic-sdk';
import {ThirdwebSDK} from '@3rdweb/sdk';
import {ethers} from 'ethers';
import {ThirdwebBridgeSDK} from '@3rdweb/unity-bridge';

import {Config} from '@constant';

export const SDKContext = React.createContext();

export const SDKProvider = ({children}) => {
  // ----- MAGIC LINK -----

  /* Configure Ethereum provider */
  const customNodeOptions = {
    rpcUrl: Config.magicRPCURL, // Polygon RPC URL
    chainId: Config.magicChainId, // Polygon chain id
  };

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    // Setting network to Polygon
    const magic = new Magic(Config.magicAPIKEY, {
      network: customNodeOptions,
    });

    // ----- variables, will be placed on env soon -----
    const allowanceAmount = ethers.utils.parseUnits(Config.maxAllowance, 18);

    // ----- setting up provider -----
    // const providerOrSigner = ethers.Wallet.createRandom().connect(rpcUrl);
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
    const signer = provider.getSigner();

    // ----- gas - less -----
    const nftlabs = new ThirdwebSDK(signer, {transactionRelayerUrl: Config.transactionRelayerUrl});
    // const nftlabs = new ThirdwebSDK(signer);

    // ----- regular -----
    const nftlabsWithoutRelay = new ThirdwebSDK(signer);

    // initialize ThirdwebBridgeSDK
    const bridge = new ThirdwebBridgeSDK(Config.magicRPCURL);
    bridge.setProviderOrSigner(signer);

    // ----- storing into context -----
    setData({
      magic,
      allowanceAmount,
      nftlabs,
      nftlabsWithoutRelay,
      bridge,
      signer,
    });
  }, []);

  // ----- end of MAGIC LINK -----

  return (
    <SDKContext.Provider value={data}>
      {children}
    </SDKContext.Provider>
  );
};
