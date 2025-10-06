const { createClient } = require('@supabase/supabase-js');
const frequenciesData = require('../assets/freqs.json');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_SERVICE_KEY environment variable is required');
  console.log('\n📝 To run this script:');
  console.log('SUPABASE_SERVICE_KEY=your_service_role_key npm run import-frequencies');
  console.log('\nGet your service role key from:');
  console.log('Supabase Dashboard → Project Settings → API → service_role key\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function importFrequencies() {
  console.log(`📊 Starting import of ${frequenciesData.length} frequencies...`);

  // Transform the data to match your database schema
  const transformedData = frequenciesData.map((item) => ({
    name: item.Condition,
    category: item.Category || 'General',
    hz_value: item.Frequencies.split(',')[0], // Use first frequency as primary
    description: `${item.Source} frequencies: ${item.Frequencies} ${item.Unit}`,
    is_active: true,
    is_premium: false,
    duration_seconds: 300, // Default 5 minutes
  }));

  // Insert in batches to avoid rate limits
  const batchSize = 100;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < transformedData.length; i += batchSize) {
    const batch = transformedData.slice(i, i + batchSize);

    try {
      const { data, error } = await supabase.from('frequencies').insert(batch).select();

      if (error) {
        console.error(`❌ Error inserting batch ${i / batchSize + 1}:`, error.message);
        errorCount += batch.length;
      } else {
        successCount += batch.length;
        console.log(`✅ Inserted batch ${i / batchSize + 1}: ${batch.length} records`);
      }
    } catch (error) {
      console.error(`❌ Exception during batch ${i / batchSize + 1}:`, error.message);
      errorCount += batch.length;
    }

    // Add a small delay between batches to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log(`\n📈 Import completed!`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
}

// Run the import
importFrequencies()
  .catch(console.error)
  .finally(() => process.exit());
