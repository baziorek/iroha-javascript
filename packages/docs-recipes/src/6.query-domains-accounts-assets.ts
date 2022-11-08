import { Client, ToriiRequirementsForApiHttp } from '@iroha2/client'
import { QueryBox } from '@iroha2/data-model'

declare const client: Client
declare const toriiRequirements: ToriiRequirementsForApiHttp

// list all domains
{
  const result = await client.requestWithQueryBox(
    toriiRequirements,
    QueryBox('FindAllDomains', null),
  )

  const domains = result
    .as('Ok')
    .result.as('Vec')
    .map((x) => x.as('Identifiable').as('Domain'))

  for (const domain of domains) {
    console.log(
      `Domain "${domain.id.name}" has ${domain.accounts.size} accounts` +
        ` and ${domain.asset_definitions.size} asset definitions`,
    )
    // => Domain "wonderland" has 5 accounts and 3 asset definitions
  }
}

// list all accounts
{
  const result = await client.requestWithQueryBox(
    toriiRequirements,
    QueryBox('FindAllAccounts', null),
  )

  const accounts = result
    .as('Ok')
    .result.as('Vec')
    .map((x) => x.as('Identifiable').as('Account'))

  for (const account of accounts) {
    console.log(
      `Account "${account.id.name}@${account.id.domain_id.name}" ` +
        `has ${account.assets.size} assets`,
    )
    // => Account "alice@wonderland" has 3 assets
  }
}

// list all assets
{
  const result = await client.requestWithQueryBox(
    toriiRequirements,
    QueryBox('FindAllAssets', null),
  )

  const assets = result
    .as('Ok')
    .result.as('Vec')
    .map((x) => x.as('Identifiable').as('Asset'))

  for (const asset of assets) {
    const assetType = asset.value.match({
      Quantity: () => 'Quantity',
      BigQuantity: () => 'Big Quantity',
      Fixed: () => 'Fixed',
      Store: () => 'Store',
    })

    console.log(
      `Asset "${asset.id.definition_id.name}#${asset.id.definition_id.domain_id.name}" ` +
        `at account "${asset.id.account_id.name}@${asset.id.account_id.domain_id.name}" ` +
        `has type "${assetType}"`,
    )
    // => Asset "rose#wonderland" at account "alice@wonderland" has type "Quantity"
  }
}