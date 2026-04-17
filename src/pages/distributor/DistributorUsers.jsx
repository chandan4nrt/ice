import { useNavigate } from "react-router-dom";
import { useGetVendors } from "../../services/distributor.service";
import { InfinitePagination } from "../../components/Pagination";

const DistributorUser = () => {
  const navigate = useNavigate();
  const {
    list: vendors = [],
    isLoading: loading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetVendors();

  // Handle Edit
  const handleEdit = (vendor) => {
    navigate(`/distributor/edit-vendor`, {
      state: { vendorId: vendor.vendorId },
    });
  };

  const handleView = (vendor) => {
    navigate(`/distributor/vendor-details`, {
      state: { vendorId: vendor.vendorId },
    });
  };

  return (
    <div className="container mt-4">
      <h3>Vendor List</h3>

      {loading ? (
        <p>Loading...</p>
      ) : !vendors.length ? (
        <p>Not Found</p>
      ) : (
        <div className="listsec">
          <div className="listbox theading">
            <div>Sl.</div>
            <div>Business Name</div>
            <div>Mobile</div>
            <div>Category</div>
            <div>Address</div>
            <div>Action</div>
          </div>
          
            <ul>
              {vendors?.length === 0 ? (
                <li>
                  <div className="text-center">No vendors found</div> 
                </li>
              ) : (
                vendors?.map((vendor, index) => ( 
                  <li> 
                  <div class="listbox academicyear" key={vendor.id || index}>
                    <div>{index + 1}</div>
                    <div data-head="Business Name">{vendor.businessName} {/* {vendor.ownerName} */}</div> 
                    <div data-head="Mobile">{vendor.mobile}</div>
                    <div data-head="Category">{vendor.category}</div>
                    <div data-head="Address">{vendor.city} {vendor.state}</div> 
                    <div className="d-flex gap-1"><button className="btn btn-sm btn-primary" onClick={() => handleEdit(vendor)} >Edit</button> <button className="btn btn-sm btn-primary" onClick={() => handleView(vendor)} >View</button></div>
                    </div>
                  </li>
                ))
              )}
            </ul> 
            
          <InfinitePagination
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      )}
    </div>
  );
};

export default DistributorUser;
