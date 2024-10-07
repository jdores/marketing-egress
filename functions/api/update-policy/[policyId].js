export async function onRequestPost({ params }) {
  const { policyId } = params;
  /*
  // Replace with your Cloudflare account details
  const accountId = 'your-account-id';
  const apiToken = 'your-cloudflare-api-token'; // Ensure it has Gateway policy edit permissions
  
  const policyUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/gateway/policies/${policyId}`;
  
  const policyUpdate = {
    // Example policy update payload
    description: `Updated Policy ${policyId}`,
    rules: [
      {
        action: "block",
        enabled: true,
        rule: {
          type: "application",
          application: {
            id: "office365"
          }
        }
      }
    ]
  };

  try {
    // Make the API request to Cloudflare Gateway
    const response = await fetch(policyUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(policyUpdate)
    });

    const result = await response.json();

    
    if (response.ok) {
      return new Response(JSON.stringify(result), { status: 200 });
    } else {
      return new Response(JSON.stringify(result), { status: response.status });
    }
  } catch (error) {
    return new Response('Error updating policy', { status: 500 });
  }

  */
  return new Response(JSON.stringify(`Updated Policy ${policyId}. ${env.segredo}`), { status: 200 });
}

