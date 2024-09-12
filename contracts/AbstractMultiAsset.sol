// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.24;

import {MelodyLib} from "./library/MelodyLib.sol";
import "./library/MelodyErrors.sol";

/**
 * @title AbstractMultiAsset
 * @author Melody team
 * @notice Abstract Smart contract implementing of multi-asset standard.
 */
abstract contract AbstractMultiAsset {
    using MelodyLib for uint64[];

    event AssetSet(uint64 indexed assetId);
    event AssetAdded(uint256 indexed tokenId, uint64 indexed assetId);
    event AssetRemoved(uint256 indexed tokenId, uint64 indexed assetId);

    /// Mapping of uint64 Ids to asset metadata
    mapping(uint64 => string) internal _assets;

    /// Mapping of tokenId to an array of assets
    mapping(uint256 => uint64[]) internal _tokenAssets;

    /// Mapping of tokenId to assetId to whether the token has this asset assigned
    mapping(uint256 => mapping(uint64 => bool)) internal _isTokenAsset;

    function getAssetMetadata(
        uint256 tokenId,
        uint64 assetId
    ) public view virtual returns (string memory metadata) {
        if (!_tokenAssets[tokenId][assetId]) revert;
        metadata = _assets[assetId];
    }

    function _addAssetEntry(
        uint64 id,
        string memory metadataURI
    ) internal virtual {
        if (id == uint64(0)) revert IdZeroForbidden();
        if (bytes(_assets[id]).length > 0) revert AssetAlreadyExists();

        _assets[id] = metadataURI;
        emit AssetSet(id);
    }

    function _addAsset(uint256 tokenId, uint64 assetId) internal virtual {
        if (_tokenAssets[tokenId][assetId]) revert AssetAlreadyExists();
        if (bytes(_assets[assetId]).length == uint256(0))
            revert NoAssetMatchingId();

        _tokenAssets[tokenId].push(assetId);
        _isTokenAsset[tokenId][assetId] = true;
        emit AssetAdded(tokenId, assetId);
    }

    // index is the index of the asset in the token's asset array
    function _removeAsset(uint256 tokenId, uint64 index) internal virtual {
        if (!_isTokenAsset[tokenId][assetId]) revert TokenDoesNotHaveAsset();
        if (bytes(_assets[assetId]).length == uint256(0))
            revert NoAssetMatchingId();

        uint64 assetId = _tokenAssets[tokenId][index];
        delete _isTokenAsset[tokenId][assetId];
        _tokenAssets[tokenId].removeItemByIndex(index);

        emit AssetRemoved(tokenId, assetId);
    }
}
