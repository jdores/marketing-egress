export async function onRequestPost({ params, env }) {
  const { policyId } = params;
  // Replace with your Cloudflare account details

  const accountId = env.ACCOUNT_ID;
  const ruleId = env.RULE_ID;
  const userEmail = env.USER_EMAIL;
  const apiKey = env.API_KEY;
  const egressApi = `https://api.cloudflare.com/client/v4/accounts/${accountId}/gateway/rules/${ruleId}`;
  
  const europeIPv4 = "8.29.231.207";
  const europeIPv6 = "2a09:bac0:1001:3f::/64";

  const usIPv4 = "8.29.230.198";
  const usIPv6 = "2a09:bac0:1000:3c::/64";

  const southamIPv4 = "104.30.133.91";
  const southamIPv6 = "2a09:bac0:1000:473::/64";

  const asiaIPv4 = "8.29.231.196";
  const asiaIPv6 = "2a09:bac0:1001:3a::/64";

  var newIPv4 = "104.30.133.92";
  var newIPv6 = "2a09:bac0:1000:35f::/64";

  console.log(policyId);
  if (policyId == 1){
    newIPv4 = europeIPv4;
    newIPv6 = europeIPv6;
  }
  if (policyId == 2){
    newIPv4 = usIPv4;
    newIPv6 = usIPv6;
  }
  if (policyId == 3){
    newIPv4 = southamIPv4;
    newIPv6 = southamIPv6;
  }
  if (policyId == 4){
    newIPv4 = asiaIPv4;
    newIPv6 = asiaIPv6;
  }
  console.log(newIPv4+" "+newIPv6);

  const policyUpdate = {
    // Example policy update payload
    action: "egress",
    description: `Updated by Cloudflare Pages`,
    device_posture: "",
    enabled: true,
    filters: ["egress"],
    identity: "any(identity.groups.name[*] in {\"marketing\"})",
    name: "Marketing user egress",
    precedence: 8753,
    rule_settings: {
      block_page_enabled: false,
      block_reason: "",
      override_ips: null,
      override_host: "",
      l4override: null,
      biso_admin_controls: null,
      add_headers: null,
      ip_categories: false,
      ip_indicator_feeds: false,
      check_session: null,
      insecure_disable_dnssec_validation: false,
      egress: {
        ipv6: `${newIPv6}`,
        ipv4: `${newIPv4}`
      }
    } 
  };

  try {
    // Make the API request to Cloudflare Gateway
    const response = await fetch(egressApi, {
      method: 'PUT',
      headers: {
        'X-Auth-Email': userEmail,
        'X-Auth-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(policyUpdate)
    });

    const result = await response.json();

    console.log(response.status)
    if (response.ok) {
      return new Response(JSON.stringify(result), { status: 200 });
    } else {
      return new Response(JSON.stringify(result), { status: "response.status" });
    }
  } catch (error) {
    return new Response('Error updating policy', { status: 500 });
  }
}

