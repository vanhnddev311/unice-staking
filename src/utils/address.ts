export const shortWalletAddress = (address: string | null | undefined) => {
	if (!address) return address
	if(address.length > 15) {
		return address.slice(0, 10) + '...' + address.slice(-4)
	}

	return address
}