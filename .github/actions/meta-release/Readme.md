
<div align="center">
  📦 :octocat:
</div>
<h1 align="center">
  action extract-metadata-release
</h1>

<p align="center">
   A GitHub Action for get metadata from GitHub Releases with specified fotmat.
</p>

<div align="center">
  <img src="demo.png"/>
</div>

<br />
## 🤸Usage
### 🚥 Metadata format

Metadata that action can get just be table markdown.
**inputs**
| Name | Type | Description |
| --- | ----------- | -------|
| `input` | String | This is `GITHUB_TOKEN` |

**Format**

```
## Some Title
- Ticket links: example.com
- ...

## Metadata

| # | Parent_key |
| --- | ----------- |
| child_key | child_key_value |
| child_key | child_key_value |
```

Output of action can access by:

```
  "${{ steps.release_metadata.outputs.parent_key_child_key }}"
```

### For Example

1. Description when release

```
## Some Title
- Ticket links: example.com
- ...

## Metadata

| # | tags | commit |
| --- | ----------- |
| repo1 | 1.2.0 | commit1 |
| repo2 | 1.3.0 | commit2 |
```
2. Setup action file

```
name: Action example
on:
  release:
    types: [published]
jobs:
  build:
    runs-on: ubuntu-18.04

    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: get release action
        id: release_metadata
        uses: ./.github/actions/meta-release
        with:
          token: ${{secrets.GITHUB_TOKEN}}
      - name: check result
        run: |
          echo "Tag repo1: ${{ steps.release_metadata.outputs.tags_repo1 }}"
          echo "Tag repo2: ${{ steps.release_metadata.outputs.tags_repo2 }}"
          echo "Commit repo1: ${{ steps.release_metadata.outputs.commit_repo1 }}"
          echo "Commit repo2: ${{ steps.release_metadata.outputs.commit_repo2 }}"

```

3. Output

```
Tag repo1: 1.2.0
Tag repo2: 1.3.0
Commit repo1: commit1
Commit repo2: commit2
```

## 🤸Build and Collaborate

**Prepare**

```
npm install
npm i -g @vercel/ncc
```

**Build**
```
ncc build index.js --minify
```
