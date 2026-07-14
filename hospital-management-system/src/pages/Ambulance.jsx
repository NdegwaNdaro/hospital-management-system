function Ambulance() {
  const ambulances = [
    {
      id: "AMB001",
      driver: "John Mwangi",
      plateNo: "KDA 234X",
      status: "Available",
      location: "Main Hospital",
    },
    {
      id: "AMB002",
      driver: "Peter Kariuki",
      plateNo: "KDB 123Y",
      status: "On Duty",
      location: "Emergency Pickup",
    },
  ];

  return (
    <div>
      <h2>Ambulance Management</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Driver</th>
            <th>Plate Number</th>
            <th>Status</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
          {ambulances.map((ambulance) => (
            <tr key={ambulance.id}>
              <td>{ambulance.id}</td>
              <td>{ambulance.driver}</td>
              <td>{ambulance.plateNo}</td>
              <td>{ambulance.status}</td>
              <td>{ambulance.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ambulance;