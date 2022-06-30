const url = "https://unstoppabledomains.g.alchemy.com/domains/brad.crypto"
const ALCHEMY_KEY = "CAbfzxTj9rZQ1MHItJm6V5opg7cf_CJu"

// UD name resolver
async function resolveUD() {
    const udName = document.getElementById("name").value
    const domain = document.getElementById("domain").value
    const udDomain = udName + "." + domain

    // if (udDomain == '' && domain == '') {
    fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
            "Authorization": `Bearer ${ALCHEMY_KEY}`,
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json())
        .then(function (data) {
            // console.log(data);
            // setTimeout(show(data), 2000)
            show(data)
        })
        .catch(function (error) {
            console.log(error);
        })
    // }
    // else {
    //     alert("something missing")
    // }

}

let ethAddress = ""

function show(data) {
    let tab = "";

    // Loop to access all rows 
    for (let x in data.records) {

        if (x.split(".")[0] === "crypto") {
            var cryptoName = x.split(".")[1]
            var cryptoAddress = data.records[x]

            if (cryptoName === 'ETH') {
                ethAddress = cryptoAddress

                tab = `<tr> 
                <td>${cryptoName} </td>
                <td>${cryptoAddress}</td>         
                </tr>` + tab;
            } else {
                tab += `<tr> 
                <td>${cryptoName} </td>
                <td>${cryptoAddress}</td>         
                </tr>`;
            }
        }
    }

    // Setting innerHTML as tab variable
    document.getElementById("result").style.display = "table"
    document.getElementById("result").innerHTML = tab;
}

// Metamask

async function init() {
    if (!window.ethereum) {
        throw new Error("No crypto wallet found!")
    }

    const eth = document.getElementById("eth").value

    try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.providers.Web3Provider(
            window.ethereum,
        )
        const signer = provider.getSigner()
        const recipient = ethers.utils.getAddress(
            ethAddress,
        )
        const tx = await signer.sendTransaction({
            to: recipient,
            value: ethers.utils.parseEther(eth),
        })
        console.log({
            from: tx.from,
            to: tx.to,
            hash: tx.hash,
        })
    } catch (e) {
        console.error(e.message)
    }
}