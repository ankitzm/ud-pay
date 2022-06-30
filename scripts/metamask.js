function pay() {

    window.addEventListener("load", async () => {
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                await ethereum.request({
                    method: "eth_requestAccounts",
                })
                initPayButton()
            } catch (err) {
                $("#status").html("User denied account access", err)
            }
        } else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider)
            initPayButton()
        } else {
            $("#status").html(
                "No Metamask (or other Web3 Provider) installed",
            )
        }
    })

    initPayButton()
}

const initPayButton = () => {
    $(".pay-button").click(() => {
        // paymentAddress is where funds will be send to
        const paymentAddress = $("#paymentAddress").val()
        const amountEth = "0.1"

        web3.eth.sendTransaction(
            {
                to: paymentAddress,
                value: web3.utils.toWei(amountEth, "ether"),
                from: "0x6cBdDF616a1ad5aE13628B342CD667C6Bc919Ba8",
            },
            (err, transactionId) => {
                if (err) {
                    console.log("Payment failed", err)
                    $("#status").html("Payment failed")
                } else {
                    console.log("Payment successful", transactionId)
                    $("#status").html("Payment successful")
                }
            },
        )
    })
}