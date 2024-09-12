// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.24;

/// @title Errors
/// @author  team
/// @notice A collection of errors used in the  suite
/// @dev Errors are kept in a centralised file in order to provide a central point of reference and to avoid error
///  naming collisions due to inheritance

/// Attempting to grant the token to 0x0 address
error ERC721AddressZeroIsNotaValidOwner();
/// Attempting to grant approval to the current owner of the token
error ERC721ApprovalToCurrentOwner();
/// Attempting to grant approval when not being owner or approved for all should not be permitted
error ERC721ApproveCallerIsNotOwnerNorApprovedForAll();
/// Attempting to grant approval to self
error ERC721ApproveToCaller();
/// Attempting to use an invalid token ID
error ERC721InvalidTokenId();
/// Attempting to mint to 0x0 address
error ERC721MintToTheZeroAddress();
/// Attempting to manage a token without being its owner or approved by the owner
error ERC721NotApprovedOrOwner();
/// Attempting to mint an already minted token
error ERC721TokenAlreadyMinted();
/// Attempting to transfer the token from an address that is not the owner
error ERC721TransferFromIncorrectOwner();
/// Attempting to safe transfer to an address that is unable to receive the token
error ERC721TransferToNonReceiverImplementer();
/// Attempting to transfer the token to a 0x0 address
error ERC721TransferToTheZeroAddress();
/// Attempting to grant approval of assets to their current owner
error ApprovalForAssetsToCurrentOwner();
/// Attempting to grant approval of assets without being the caller or approved for all
error ApproveForAssetsCallerIsNotOwnerNorApprovedForAll();
/// Attempting to incorrectly configue a Catalog item
error BadConfig();
/// Attempting to set the priorities with an array of length that doesn't match the length of active assets array
error BadPriorityListLength();
/// Attempting to add an asset entry with `Part`s, without setting the `Catalog` address
error CatalogRequiredForParts();
/// Attempting to transfer a soulbound (non-transferrable) token
error CannotTransferSoulbound();
/// Attempting to accept a child that has already been accepted
error ChildAlreadyExists();
/// Attempting to interact with a child, using index that is higher than the number of children
error ChildIndexOutOfRange();
/// Attempting to find the index of a child token on a parent which does not own it.
error ChildNotFoundInParent();
/// Attempting to equip a `Part` with a child not approved by the Catalog
error EquippableEquipNotAllowedByCatalog();
/// Attempting to use ID 0, which is not supported
/// @dev The ID 0 in  suite is reserved for empty values. Guarding against its use ensures the expected operation
error IdZeroForbidden();
/// Attempting to interact with an asset, using index greater than number of assets
error IndexOutOfRange();
/// Attempting to reclaim a child that can't be reclaimed
error InvalidChildReclaim();
/// Attempting to interact with an end-user account when the contract account is expected
error IsNotContract();
/// Attempting to interact with a contract that had its operation locked
error Locked();
/// Attempting to add a pending child after the number of pending children has reached the limit (default limit is 128)
error MaxPendingChildrenReached();
/// Attempting to add a pending asset after the number of pending assets has reached the limit (default limit is
///  128)
error MaxPendingAssetsReached();
/// Attempting to burn a total number of recursive children higher than maximum set
/// @param childContract Address of the collection smart contract in which the maximum number of recursive burns was reached
/// @param childId ID of the child token at which the maximum number of recursive burns was reached
error MaxRecursiveBurnsReached(address childContract, uint256 childId);
/// Attempting to mint a number of tokens that would cause the total supply to be greater than maximum supply
error MintOverMax();
/// Attempting to mint zero tokens
error MintZero();
/// Attempting to pass complementary arrays of different lengths
error MismachedArrayLength();
/// Attempting to transfer a child before it is unequipped
error MustUnequipFirst();
/// Attempting to nest a child over the nestable limit (current limit is 100 levels of nesting)
error NestableTooDeep();
/// Attempting to nest the token to own descendant, which would create a loop and leave the looped tokens in limbo
error NestableTransferToDescendant();
/// Attempting to nest the token to a smart contract that doesn't support nesting
error NestableTransferToNonNestableImplementer();
/// Attempting to nest the token into itself
error NestableTransferToSelf();
/// Attempting to interact with an asset that can not be found
error NoAssetMatchingId();
/// Attempting to manage an asset without owning it or having been granted permission by the owner to do so
error NotApprovedForAssetsOrOwner();
/// Attempting to interact with a token without being its owner or having been granted permission by the
///  owner to do so
/// @dev When a token is nested, only the direct owner (NFT parent) can mange it. In that case, approved addresses are
///  not allowed to manage it, in order to ensure the expected behaviour
error NotApprovedOrDirectOwner();
/// Attempting to compose an asset wihtout having an associated Catalog
error NotComposableAsset();
/// Attempting to unequip an item that isn't equipped
error NotEquipped();
/// Attempting to interact with a management function without being the smart contract's owner
error NotOwner();
/// Attempting to interact with a function without being the owner or contributor of the collection
error NotOwnerOrContributor();
/// Attempting to transfer the ownership to the 0x0 address
error NewOwnerIsZeroAddress();
/// Attempting to assign a 0x0 address as a contributor
error NewContributorIsZeroAddress();
/// Attempting an operation requiring the token being nested, while it is not
error ParentIsNotNFT();
/// Attempting to add a `Part` with an ID that is already used
error PartAlreadyExists();
/// Attempting to use a `Part` that doesn't exist
error PartDoesNotExist();
/// Attempting to use a `Part` that is `Fixed` when `Slot` kind of `Part` should be used
error PartIsNotSlot();
/// Attempting to interact with a pending child using an index greater than the size of pending array
error PendingChildIndexOutOfRange();
/// Attempting to add an asset using an ID that has already been used
error AssetAlreadyExists();
/// Attempting to equip an item into a slot that already has an item equipped
error SlotAlreadyUsed();
/// Attempting to equip an item into a `Slot` that the target asset does not implement
error TargetAssetCannotReceiveSlot();
/// Attempting to equip a child into a `Slot` and parent that the child's collection doesn't support
error TokenCannotBeEquippedWithAssetIntoSlot();
/// Attempting to compose a NFT of a token without active assets
error TokenDoesNotHaveAsset();
/// Attempting to determine the asset with the top priority on a token without assets
error TokenHasNoAssets();
/// Attempting to accept or transfer a child which does not match the one at the specified index
error UnexpectedChildId();
/// Attempting to reject all pending assets but more assets than expected are pending
error UnexpectedNumberOfAssets();
/// Attempting to reject all pending children but children assets than expected are pending
error UnexpectedNumberOfChildren();
/// Attempting to accept or reject an asset which does not match the one at the specified index
error UnexpectedAssetId();
/// Attempting an operation expecting a parent to the token which is not the actual one
error UnexpectedParent();
/// Attempting not to pass an empty array of equippable addresses when adding or setting the equippable addresses
error ZeroLengthIdsPassed();
/// Attempting to set the royalties to a value higher than 100% (10000 in basis points)
error RoyaltiesTooHigh();
/// Attempting to do a bulk operation on a token that is not owned by the caller
error CanOnlyDoBulkOperationsOnOwnedTokens();
/// Attempting to do a bulk operation with multiple tokens at a time
error CanOnlyDoBulkOperationsWithOneTokenAtATime();
/// Attempting to pay with native token with a value different than expected
error WrongValueSent();
// Attempting to send native token to a recipient that is unable to receive it
error TransferFailed();
