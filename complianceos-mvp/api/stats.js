// Vercel Serverless Function for dashboard stats
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // TODO: Calculate from database (Supabase)
    // const { data: cases } = await supabase.from('kyc_cases').select('*');
    // Calculate real stats from cases

    // Mock stats for now
    const stats = {
      totalChecks: 847,
      approved: 782,
      pending: 12,
      rejected: 53,
      approvalRate: 92.3,
      totalChecksChange: 12.5,
      approvalRateChange: 2.1,
      avgProcessingTime: 2.4,
      riskDistribution: {
        low: 782,
        medium: 45,
        high: 20
      },
      weeklyData: [65, 72, 68, 75, 82, 78, 85],
      riskData: [
        { label: 'Low', value: 782, color: 'bg-blue-500', percentage: 92.3 },
        { label: 'Medium', value: 45, color: 'bg-orange-500', percentage: 5.3 },
        { label: 'High', value: 20, color: 'bg-red-500', percentage: 2.4 }
      ]
    };

    return res.status(200).json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Fetch Stats Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
