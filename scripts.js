const { Client, PrivateKey, AccountId, ContractExecuteTransaction, ContractFunctionParameters } = require('@hashgraph/sdk');
require('dotenv').config();

const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
const contractId = process.env.CONTRACT_ID;

const client = Client.forTestnet();
client.setOperator(operatorId, operatorKey);

document.getElementById('createPresaleForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const tokenName = document.getElementById('tokenName').value;
    const aboutToken = document.getElementById('aboutToken').value;
    const tokenID = document.getElementById('tokenID').value;
    const tokenSymbol = document.getElementById('tokenSymbol').value;
    const totalSupply = document.getElementById('totalSupply').value;
    const presaleAllocation = document.getElementById('presaleAllocation').value;
    const liquidityAllocation = document.getElementById('liquidityAllocation').value;
    const presaleRate = document.getElementById('presaleRate').value;
    const listingRate = document.getElementById('listingRate').value;
    const softcap = document.getElementById('softcap').value;
    const hardcap = document.getElementById('hardcap').value;
    const min = document.getElementById('min').value;
    const max = document.getElementById('max').value;
    const startTime = new Date(document.getElementById('startTime').value).getTime() / 1000;
    const deadline = new Date(document.getElementById('deadline').value).getTime() / 1000;
    const image = document.getElementById('image').value;
    const feeOption = document.getElementById('feeOption').value === 'true';
    const liquidityPercentage = document.getElementById('liquidityPercentage').value;
    const isWhitelisted = document.getElementById('isWhitelisted').value === 'true';
    const nftTokenId = document.getElementById('nftTokenId').value;
    const useSaucerSwap = document.getElementById('useSaucerSwap').value === 'true';
    const whitelistDuration = document.getElementById('whitelistDuration').value;
    const burnUnsoldTokens = document.getElementById('burnUnsoldTokens').value === 'true';

    const contractExecTx = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(1000000)
        .setPayableAmount(500)
        .setFunction("createPresale", new ContractFunctionParameters()
            .addString(tokenName)
            .addString(aboutToken)
            .addAddress(tokenID)
            .addString(tokenSymbol)
            .addUint256(totalSupply)
            .addUint256(presaleAllocation)
            .addUint256(liquidityAllocation)
            .addUint256(presaleRate)
            .addUint256(listingRate)
            .addUint256(softcap)
            .addUint256(hardcap)
            .addUint256(min)
            .addUint256(max)
            .addUint256(startTime)
            .addUint256(deadline)
            .addString(image)
            .addBool(feeOption)
            .addUint256(liquidityPercentage)
            .addBool(isWhitelisted)
            .addUint256(nftTokenId)
            .addBool(useSaucerSwap)
            .addUint256(whitelistDuration)
            .addBool(burnUnsoldTokens)
        );

    const txResponse = await contractExecTx.execute(client);
    const receipt = await txResponse.getReceipt(client);

    alert('Presale created with ID: ' + receipt.contractId.toString());
});

document.getElementById('donateForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const presaleId = document.getElementById('presaleId').value;
    const amount = document.getElementById('amount').value;

    const contractExecTx = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(1000000)
        .setPayableAmount(amount)
        .setFunction("donateToPresale", new ContractFunctionParameters().addUint256(presaleId));

    const txResponse = await contractExecTx.execute(client);
    const receipt = await txResponse.getReceipt(client);

    alert('Donation successful. Status: ' + receipt.status.toString());
});

document.getElementById('refundForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const presaleId = document.getElementById('presaleId').value;

    const contractExecTx = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(1000000)
        .setFunction("requestRefund", new ContractFunctionParameters().addUint256(presaleId));

    const txResponse = await contractExecTx.execute(client);
    const receipt = await txResponse.getReceipt(client);

    alert('Refund request processed. Status: ' + receipt.status.toString());
});
