# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

First Ticket: 
**Description**
- Add to the Agent model the Custom ID, along with constrain of not null, and backfill it currently with their internal `id`.
Timestamp: 2 Days

Second Ticket: 
**Description**
- Adjust the current endpoint responsible to `UPDATE` the `Agent`, so given the internal `id` of the agent, the same can be updated with a body that contains the following:
```json
{
  "custom_id": "24524542"
}
```
- Make sure to add validations as these `custom_id` cannot be null and if sent, just return the errors as expected
Timestamp: 1 Week

Third Ticket: 
**Description**
- Adjust the current functionality of `getShiftsByFacility` and add the information related to the `custom_id` about the Agent on the metadata information result of the function
Timestamp: 1 Day

Fourth Ticket:
**Description**
- Update the PDF Design to add the `custom_id` as `Facility Agent ID` using the value of custom on the `pdf`. Make sure to adjust the function of `generateReport` so you can receive the expected data. This ticket is dependent on the previous one. 
Timestamp: 2 Days
