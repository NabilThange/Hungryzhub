// app/api/form-data/route.ts
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Starting form data fetch process');
    console.log('Environment variables:');
    console.log('GOOGLE_SHEETS_CLIENT_EMAIL:', !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL ? 'Present' : 'Missing');
    console.log('GOOGLE_SHEETS_PRIVATE_KEY:', !!process.env.GOOGLE_SHEETS_PRIVATE_KEY ? 'Present' : 'Missing');
    console.log('GOOGLE_SPREADSHEET_ID:', process.env.GOOGLE_SPREADSHEET_ID);

    // Set up Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    console.log('Attempting to fetch spreadsheet data');
    // Fetch data from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Form Responses 1!A:Z', // Adjust range based on your form columns
    });

    console.log('Spreadsheet data fetched successfully');
    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.warn('No data found in spreadsheet');
      return NextResponse.json({ error: 'No data found' });
    }

    console.log(`Total rows fetched: ${rows.length}`);
    const headers = rows[0];
    console.log('Headers:', headers);
    const data = rows.slice(1);
    
    // Log raw row data for debugging
    console.log('Raw Row Data:');
    data.forEach((row, index) => {
      console.log(`Row ${index + 1}:`, row);
    });
    
    // Calculate total votes
    const totalVotes = data.length;
    console.log(`Total votes: ${totalVotes}`);
    
    // Calculate this week's votes
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const thisWeek = data.filter(row => {
      const timestamp = new Date(row[0]); // Assuming timestamp is in first column
      return timestamp >= oneWeekAgo;
    }).length;
    console.log(`Votes this week: ${thisWeek}`);

    // Get top 3 most common responses
    const allResponses: { [key: string]: number } = {};
    
    data.forEach(row => {
      // Specifically target column E (index 4) for food-related requests
      // Assuming column E contains the specific food/drink items
      console.log('Processing row:', row);
      
      // Check if column E exists and is not empty
      const columnEContent = row[4];
      if (columnEContent && columnEContent.trim()) {
        console.log('Column E content:', columnEContent);
        
        // Handle multiple selections separated by commas
        const responses = columnEContent.split(',').map((r: string) => r.trim());
        console.log('Parsed responses from Column E:', responses);
        
        responses.forEach((response: string) => {
          if (response) {
            allResponses[response] = (allResponses[response] || 0) + 1;
          }
        });
      }
    });

    console.log('All Responses from Column E:', allResponses);

    const topRequests = Object.entries(allResponses)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([request, count]) => ({ request, count }));
    
    console.log('Top Requests from Column E:', topRequests);

    // Get latest student request with random selection
    const latestEntry = data[data.length - 1];
    let studentName = 'Anonymous';
    let randomResponse = 'No response';

    if (latestEntry && latestEntry.length > 1) {
      // Assuming name is in column 2 (index 1) - adjust based on your form
      studentName = latestEntry[1] || 'Anonymous';
      
      // Collect all non-empty responses from the latest entry
      const responses: string[] = [];
      for (let i = 2; i < latestEntry.length; i++) {
        if (latestEntry[i] && latestEntry[i].trim()) {
          const entryResponses = latestEntry[i].split(',').map((r: string) => r.trim());
          responses.push(...entryResponses.filter((r: string) => r));
        }
      }
      
      // Pick a random response
      if (responses.length > 0) {
        randomResponse = responses[Math.floor(Math.random() * responses.length)];
      }
    }

    console.log('Latest Request:', { studentName, randomResponse });

    const responseData = {
      totalVotes,
      thisWeek,
      topRequests,
      liveRequest: {
        name: studentName,
        response: randomResponse
      }
    };

    console.log('Final Response Data:', responseData);

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Error fetching form data:', error);
    // If it's an error with a response, log more details
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Failed to fetch data' }, 
      { status: 500 }
    );
  }
}