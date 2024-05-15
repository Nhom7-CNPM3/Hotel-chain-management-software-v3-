'use client'

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor
} from "@nextui-org/react";
import {VerticalDotsIcon} from "@/components/Icons/VerticalDotsIcon";
import {ChevronDownIcon} from "@/components/Icons/ChevronDownIcon";
import {SearchIcon} from "@/components/Icons/SearchIcon";
import {columns} from "@/Testing/Data/data";
import {capitalize} from "@/utils/reconstruct";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'
import deleteHangHoa from "@/actions/DELETE/delete-hang-hoa";



const INITIAL_VISIBLE_COLUMNS = ["id", "TenHangHoa", "GiaGocHangHoa", "GiaBanHangHoa", "SLTonKho", "actions"];

type HangHoa = any;

export default function AdminHangHoaTable({ hangHoaData }: { hangHoaData: HangHoa[] }) {

  const router = useRouter()
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "SLTonKho",
    direction: "ascending",
  });

  // OnClick Events
  const handleNavToView = (id: string) => {
    router.push(`/Admin/Goods/${id}/View`);
  }

  const handleNavToEdit = (id: string) => {
    router.push(`/Admin/Goods/${id}/Edit`);
  }

  const handleNavToDelete = async (id: string) => {

    try {
      const deleteHangHoaReturn = await deleteHangHoa(id)
      if(!deleteHangHoaReturn){
        toast.error("Xóa thất bại, lỗi 500")
      } else {
        toast.success(`Xóa ${deleteHangHoaReturn.TenHangHoa} thành công`)
        window.location.reload()
      }
    } catch (error:any) {
      toast.error(error.message)
    }
   
  }

  // 

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = hangHoaData ? [...hangHoaData] : [];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((hangHoaData) =>
      hangHoaData.TenHangHoa.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredUsers;
  }, [filterValue, hangHoaData]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: HangHoa, b: HangHoa) => {
      const first = a[sortDescriptor.column as keyof HangHoa] as number;
      const second = b[sortDescriptor.column as keyof HangHoa] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((hangHoaData: HangHoa, columnKey: React.Key) => {
    const cellValue = hangHoaData[columnKey as keyof HangHoa];

    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small text-black capitalize">{cellValue}</p>
          </div>
        );
      case "TenHangHoa":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small text-black capitalize">{cellValue}</p>
          </div>
        );
        case "GiaGocHangHoa":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small text-black capitalize">{Number(cellValue).toLocaleString()}</p>
            </div>
          );
        case "GiaBanHangHoa":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small text-black capitalize">{Number(cellValue).toLocaleString()}</p>
            </div>
          );
        case "SLTonKho":
              return (
                <div className="flex flex-col">
                  <p className="text-bold text-small text-black capitalize">{cellValue}</p>
                </div>
              );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
              <DropdownItem>
                <button 
              onClick={() => handleNavToView(hangHoaData.id)}
                className="w-full"
                >
                  <span>View</span>
                </button>
              </DropdownItem>
                <DropdownItem>
                <button 
              onClick={() => handleNavToEdit(hangHoaData.id)}
                className="w-full"
                >
                  <span>Edit</span>
                </button>
                </DropdownItem>
                <DropdownItem>
                <button 
                onClick={() => handleNavToDelete(hangHoaData.id)}
                className="w-full"
                >
                  <span>Delete</span>
                </button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-2 light">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[60%] text-black"
            placeholder="Tìm kiếm bằng Tên Hàng..."
            startContent={<SearchIcon className="text-black" />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Tổng {hangHoaData ? hangHoaData.length : 0} hàng hóa</span>
          <label className="flex items-center text-default-400 text-small">
            Số dòng mỗi trang:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    hangHoaData?.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center light">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px] light",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No data found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
