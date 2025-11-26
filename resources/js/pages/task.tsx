import AppLayout from "@/layouts/app-layout";
import { SharedData, Task, User } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function UserManagement({tasks}: {tasks: Task[]}){
    const { auth } = usePage<SharedData>().props;
    type TaskType = {
        id: number
        subject: string
        title: string
        class: string
        uploader_id: number
        progress: number 
        due_date: string
    }

    const columns: ColumnDef<TaskType>[] = [
    {
        id: "select",
        header: ({ table }) => (
        <Checkbox
            checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
        />
        ),
        cell: ({ row }) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
        />
        ),
        enableSorting: false,
        enableHiding: false,
        },
        {
            accessorKey: "title",
            header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Title
                <ArrowUpDown />
                </Button>
            )
            },
            cell: ({ row }) => <div className="lowercase ml-3">{row.getValue("title")}</div>,
        },
        {
            accessorKey: "class",
            header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Class
                <ArrowUpDown />
                </Button>
            )
            },
            cell: ({ row }) => <div className="lowercase ml-3">{row.getValue("class")}</div>,
        },
        {
            accessorKey: "uploader_id",
            header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Uploader
                <ArrowUpDown />
                </Button>
            )
            },
            cell: ({ row }) => <div className="lowercase ml-3">{row.getValue("uploader_id")}</div>,
        },
        {
            accessorKey: "due_date",
            header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Due Date
                <ArrowUpDown />
                </Button>
            )
            },
            cell: ({ row }) => <div className="lowercase ml-3">{row.getValue("due_date")}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
            const payment = row.original
            return (
                <div className="space-x-2 text-right">
                    <Button size="sm" variant="destructive">Delete</Button>
                    <Button size="sm" variant="secondary">Edit</Button>
                </div>
            )
            },
        },
    ]

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
    data: tasks,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

    const handleShow = (id: number) => {
        router.visit('task/1');
        // router.visit(`task/${id}`);
    }
    return (
        <AppLayout>
            <Head title="User Management"/>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {auth.user.role !== 'user' ? (
                <div className="flex-1">
                    <div className="flex items-center py-4 justify-between">
                        <Input
                        placeholder="Filter emails..."
                        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("title")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                        />
                        {auth.user.role !== 'student' && (
                            <Button>
                                Create Task
                            </Button>
                        )}
                    </div>
                    <div className="overflow-hidden rounded-md border">
                        <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                )
                                })}
                            </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                    </TableCell>
                                ))}
                                </TableRow>
                            ))
                            ) : (
                            <TableRow>
                                <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                                >
                                No results.
                                </TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="text-muted-foreground flex-1 text-sm">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>
                        <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                        </div>
                    </div>
                </div>
                )
                :
                <div className="flex-1 space-y-4">
                    {tasks.map((task) => (
                        <Card className="hover:shadow-md transition gap-4" onClick={() => handleShow(task.id)}>
                            <CardHeader>
                                <CardTitle>{task.subject}</CardTitle>
                                <CardDescription>{task.class}</CardDescription>
                                {/* <CardDescription className="max-w-xs flex gap-2 items-center">
                                    <span className="text-xs">99%</span><Progress value={30}/>
                                </CardDescription> */}
                            </CardHeader>
                            <CardContent>
                                {/* <p>{task.description}</p> */}
                                {/* <CardDescription>Due: {task.due_date}</CardDescription> */}
                                <CardDescription>Remaining Task: 4</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            }
            </div>
        </AppLayout>
    );
}