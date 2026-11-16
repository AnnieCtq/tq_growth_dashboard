// acc_sb_adapter.sv
// ACC frontdoor project, Day 1. Skeleton only: the field mapping is yours to write.
//
// Where this file sits in a frontdoor access:
//
//   seq: regmodel.REG.write(status, val, UVM_FRONTDOOR, .parent(this))
//     -> uvm_reg_map (ACC map)          full address = map base + register offset
//       -> adapter.reg2bus()             uvm_reg_bus_op  ->  SB sequence item     (this file)
//         -> SB sequencer -> SB driver -> DUT SB interface
//       <- adapter.bus2reg()             SB response    ->  uvm_reg_bus_op        (this file)
//   SB monitor -> uvm_reg_predictor -> adapter.bus2reg() -> mirror update           (Day 2)
//
// ---------------------------------------------------------------------------
// Contract with the sideband-bus (SB) UVC. Fill this in from the real item and driver
// BEFORE writing any logic below.
//   item class name  : ______________   (replace sb_item in this file)
//   address field    : ________  width ___   byte- or dword-addressed? ___
//   data field       : ________  width ___
//   read/write field : ________  encoding ___
//   byte enables     : yes / no  field ________
//   response / error : field ________  does the driver return a response
//                      (item_done(rsp) or put_response)? yes / no
//   ACC map used    : default_map or ________   base address ________
//   ACC a submap of a bigger SB or SoC map?  yes / no
// ---------------------------------------------------------------------------

class acc_sb_adapter extends uvm_reg_adapter;
  `uvm_object_utils(acc_sb_adapter)

  function new(string name = "acc_sb_adapter");
    super.new(name);
    // TODO: set supports_byte_enable and provides_responses.
    // HINT: both must match what the SB driver actually does (see the contract above).
    // QUESTION to answer before setting provides_responses: if it is 1 but the
    //   driver never returns a response, what happens to reg.read()?
  endfunction

  // Called by the map once per frontdoor access.
  virtual function uvm_sequence_item reg2bus(const ref uvm_reg_bus_op rw);
    sb_item item;
    item = sb_item::type_id::create("item");
    // TODO: translate rw.kind, rw.addr, rw.data (and rw.byte_en if supported)
    //       into the SB item's fields.
    // HINT: rw.addr is already the full address the map computed. Don't add a base
    //       address here; on Day 1 find out where that base comes from.
    // HINT: for a read, what should the item's data field hold, and does it matter?
    return item;
  endfunction

  // Called with a completed SB item: by the map when provides_responses = 1,
  // and by the predictor for every item the monitor observes (Day 2).
  virtual function void bus2reg(uvm_sequence_item bus_item, ref uvm_reg_bus_op rw);
    sb_item item;
    if (!$cast(item, bus_item)) begin
      `uvm_fatal(get_type_name(), "bus_item is not an sb_item")
      return;
    end
    // TODO: fill rw.kind, rw.addr, rw.data and rw.status from the item.
    // HINT: rw.status is how a bus error reaches the caller's status argument.
    // QUESTION: if you always set rw.status = UVM_IS_OK, which bugs can your
    //   tests never see?
  endfunction

endclass
