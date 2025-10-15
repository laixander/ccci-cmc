<template>
    <Page title="Clockify Exporter" description="Export Clockify time entries to Excel">
        <Block>


            <div class="space-y-6">

                <!-- 1. API Key & Workspace -->
                <section class="space-y-4">
                    <div class="flex items-center gap-3">
                        <div
                            class="bg-success dark:bg-success-900 flex items-center justify-center font-semibold text-white w-10 h-10 rounded-xl">
                            1</div>
                        <div>
                            <div class="font-semibold">Workspace</div>
                            <div class="text-muted text-sm">Enter API Key and Select Workspace</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <UInput v-model="apiKey" placeholder="API Key" variant="soft" size="lg" class="w-full" />
                        <UButton label="Fetch Workspaces" icon="i-lucide-refresh-cw" size="lg"
                            @click="fetchWorkspaces" />
                    </div>
                    <UButton v-for="ws in workspaces" :key="ws.id" @click="selectWorkspace(ws)" icon="i-lucide-landmark"
                        variant="subtle" size="lg">
                        {{ ws.name }}
                    </UButton>
                    <div class="text-sm text-success">{{ feedback }}</div>
                </section>

                <USeparator v-if="selectedWorkspace" />

                <!-- 2. Search User -->
                <section class="space-y-4" v-if="selectedWorkspace">
                    <div class="flex items-center gap-3">
                        <div
                            class="bg-success dark:bg-success-900 flex items-center justify-center font-semibold text-white w-10 h-10 rounded-xl">
                            2</div>
                        <div>
                            <div class="font-semibold">User</div>
                            <div class="text-muted text-sm">Search User by Name or Email</div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2">
                        <UInput v-model="userQuery" placeholder="Enter name or email" variant="soft" size="lg"
                            class="w-full" />
                        <UButton label="Search" icon="i-lucide-search" size="lg" @click="searchUser" />
                    </div>

                    <div class="space-y-2 space-x-2">
                        <div v-if="loadingUsers" class="text-gray-500">Loading users...</div>

                        <UButton v-for="user in searchResults" :key="user.id" @click="selectUser(user)"
                            icon="i-lucide-user" variant="subtle" size="lg">
                            {{ user.name }} ({{ user.email }})
                        </UButton>

                        <p v-if="!loadingUsers && searchResults.length === 0 && userQuery" class="text-gray-400 italic">
                            No users found.
                        </p>
                    </div>
                </section>

                <USeparator v-if="selectedUser" />

                <!-- 3. Selected User & Date Range -->
                <section class="space-y-4" v-if="selectedUser">
                    <div class="flex items-center gap-3">
                        <div
                            class="bg-success dark:bg-success-900 flex items-center justify-center font-semibold text-white w-10 h-10 rounded-xl">
                            3</div>
                        <div>
                            <div class="font-semibold">Date Range</div>
                            <div class="text-muted text-sm">Set up the date range of the time entries</div>
                        </div>
                    </div>
                    <div class="text-sm text-success">
                        Selected User: {{ selectedUser.name }} ({{ selectedUser.email }})
                    </div>
                    <!-- <div class="mt-2 flex flex-wrap gap-3 items-center">
                        <label>Start Date:</label>
                        <input v-model="startDate" type="date" class="border p-1 rounded" />
                        <label>End Date:</label>
                        <input v-model="endDate" type="date" class="border p-1 rounded" />
                        <button @click="fetchTimeEntries" class="bg-blue-500 text-white px-3 py-1 rounded">Fetch Time
                            Entries</button>
                    </div> -->
                    <div class="flex items-end gap-6">
                        <UFormField label="Start Date:" size="lg"
                            :ui="{ root: 'flex items-center gap-2', container: 'mt-0' }">
                            <UInput v-model="startDate" type="date" variant="soft" />
                        </UFormField>
                        <UFormField label="End Date:" size="lg"
                            :ui="{ root: 'flex items-center gap-2', container: 'mt-0' }">
                            <UInput v-model="endDate" type="date" variant="soft" />
                        </UFormField>
                        <UButton label="Fetch Time Entries" icon="i-lucide-download" size="lg"
                            @click="fetchTimeEntries" />
                    </div>
                    <div class="text-sm text-success">{{ timeFeedback }}</div>
                </section>

                <USeparator v-if="entries.length > 0" />

                <!-- 4. Time Entries Preview -->
                <section class="space-y-4" v-if="entries.length > 0">
                    <div class="flex items-center gap-3">
                        <div
                            class="bg-success dark:bg-success-900 flex items-center justify-center font-semibold text-white w-10 h-10 rounded-xl">
                            4</div>
                        <div>
                            <div class="font-semibold">Time Entries</div>
                            <div class="text-muted text-sm">Preview of time entries based on the set date range</div>
                        </div>
                    </div>

                    <!-- Add Entry -->
                    <UCard :ui="{ body: 'sm:p-4' }">
                        <div class="flex items-center gap-2 mb-2">
                            <UIcon name="i-lucide-pencil-line" class="size-4 shrink-0" />
                            <span class="font-semibold text-sm">Add New Entry</span>
                        </div>
                        <div class="flex items-end gap-6">
                            <UFormField label="Date:" size="lg"
                                :ui="{ root: 'flex items-center gap-2', container: 'mt-0' }">
                                <UInput v-model="newEntry.date" type="date" variant="soft" />
                            </UFormField>
                            <UFormField label="Description:" size="lg"
                                :ui="{ root: 'flex items-center gap-2 w-full', container: 'mt-0 w-full' }">
                                <UInput v-model="newEntry.desc" placeholder="Enter description" variant="soft"
                                    class="w-full" />
                            </UFormField>
                            <UFormField label="Start:" size="lg"
                                :ui="{ root: 'flex items-center gap-2', container: 'mt-0' }">
                                <UInput v-model="newEntry.start" type="time" variant="soft" />
                            </UFormField>
                            <UFormField label="End:" size="lg"
                                :ui="{ root: 'flex items-center gap-2', container: 'mt-0' }">
                                <UInput v-model="newEntry.end" type="time" variant="soft" />
                            </UFormField>
                            <UButton label="Add" icon="i-lucide-plus" size="lg" color="success" @click="addEntry" />
                        </div>
                    </UCard>

                    <!-- Table -->
                    <UCard :ui="{body:'p-0 sm:p-0'}">
                        <div v-html="previewHtml" class="dark:text-gray-900 dark:bg-white text-sm"></div>
                    </UCard>
                </section>

                <USeparator v-if="entries.length > 0" />

                <!-- 5. Export -->
                <section class="space-y-4" v-if="entries.length > 0">
                    <div class="flex items-center gap-3">
                        <div
                            class="bg-success dark:bg-success-900 flex items-center justify-center font-semibold text-white w-10 h-10 rounded-xl">
                            5</div>
                        <div>
                            <div class="font-semibold">Export</div>
                            <div class="text-muted text-sm">Export displayed data</div>
                        </div>
                    </div>
                    <div class="flex items-end gap-2">
                        <UFormField label="Export File Name:" size="lg"
                            :ui="{ root: 'flex items-center gap-2 w-full', container: 'mt-0 w-full', label: 'whitespace-nowrap' }">
                            <UInput v-model="exportFileName" variant="soft" class="w-full" />
                        </UFormField>
                        <UButton label="Export to Excel" icon="i-lucide-file-spreadsheet" size="lg" color="success" @click="exportExcel" />
                    </div>
                </section>
            </div>
        </Block>
    </Page>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import ExcelJS from 'exceljs'

interface Workspace {
    id: string
    name: string
}
interface ClockifyUser {
    id: string
    name: string
    email: string
}
interface TimeEntry {
    description: string
    timeInterval: { start: string; end: string }
}

const apiKey = ref('')
const workspaces = ref<Workspace[]>([])
const selectedWorkspace = ref<Workspace | null>(null)
const feedback = ref('')
const users = ref<ClockifyUser[]>([])
const userQuery = ref('')
const searchResults = ref<ClockifyUser[]>([])
const selectedUser = ref<ClockifyUser | null>(null)
const startDate = ref('')
const endDate = ref('')
const entries = ref<TimeEntry[]>([])
const timeFeedback = ref('')
const newEntry = ref({ date: '', desc: '', start: '09:00', end: '17:00' })
const exportFileName = ref('Accomplishment Report ([start date] Week#) - Last Name, First Name')

/* Helpers */
const secondsToDuration = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = Math.floor(s % 60)
    return `${h}h ${m}m ${sec}s`
}

/* 1. Workspaces */
async function fetchWorkspaces() {
    if (!apiKey.value) return alert('Please enter API Key')
    feedback.value = 'Loading...'
    try {
        const res = await fetch('https://api.clockify.me/api/v1/workspaces', {
            headers: { 'X-Api-Key': apiKey.value }
        })
        workspaces.value = await res.json()
        feedback.value = 'Workspaces fetched successfully!'
    } catch (err) {
        console.error(err)
        feedback.value = 'Error fetching workspaces.'
    }
}

function selectWorkspace(ws: Workspace) {
    selectedWorkspace.value = ws
    feedback.value = `Selected workspace: ${ws.name}`
    fetchUsers()
}

/* 2. Users */
const loadingUsers = ref(false)

async function fetchUsers() {
    if (!selectedWorkspace.value) return
    loadingUsers.value = true
    try {
        const res = await fetch(
            `https://api.clockify.me/api/v1/workspaces/${selectedWorkspace.value.id}/users?page-size=100`,
            { headers: { 'X-Api-Key': apiKey.value } }
        )
        users.value = await res.json()
    } catch (err) {
        console.error('Error fetching users', err)
    } finally {
        loadingUsers.value = false
    }
}

async function searchUser() {
    // ✅ Fetch users first if list is empty
    if (!users.value.length) {
        await fetchUsers()
    }

    const q = userQuery.value.trim().toLowerCase()
    if (!q) {
        searchResults.value = []
        return
    }

    searchResults.value = users.value.filter(
        (u) =>
            u.name?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q)
    )
}

function selectUser(user: ClockifyUser) {
    selectedUser.value = user
}


/* 3. Time Entries */
async function fetchTimeEntries() {
    if (!selectedWorkspace.value || !selectedUser.value) return alert('Select workspace & user')
    if (!startDate.value || !endDate.value) return alert('Select both dates')

    timeFeedback.value = 'Loading...'
    try {
        const startISO = new Date(startDate.value + 'T00:00:00Z').toISOString()
        const endISO = new Date(endDate.value + 'T23:59:59Z').toISOString()
        const res = await fetch(
            `https://api.clockify.me/api/v1/workspaces/${selectedWorkspace.value.id}/user/${selectedUser.value.id}/time-entries?start=${startISO}&end=${endISO}&page-size=100`,
            { headers: { 'X-Api-Key': apiKey.value } }
        )
        entries.value = await res.json()
        timeFeedback.value = 'Time entries fetched successfully!'
    } catch (err) {
        console.error(err)
        timeFeedback.value = 'Error fetching entries.'
    }
}

/* 4. Add Entry */
function addEntry() {
    if (!newEntry.value.date || !newEntry.value.desc) return alert('Fill in all fields')
    const startISO = new Date(`${newEntry.value.date}T${newEntry.value.start}:00`).toISOString()
    const endISO = new Date(`${newEntry.value.date}T${newEntry.value.end}:00`).toISOString()
    entries.value.push({
        description: newEntry.value.desc,
        timeInterval: { start: startISO, end: endISO }
    })
    newEntry.value = { date: '', desc: '', start: '09:00', end: '17:00' }
}

/* Grouping & Table Preview */
function groupAndFormatEntries() {
    const grouped: Record<string, TimeEntry[]> = {}

    // Group entries by date
    for (const e of entries.value) {
        const start = e.timeInterval?.start
        if (!start) continue

        const key = start.slice(0, 10)
        if (!grouped[key]) grouped[key] = [] // ✅ ensures array is initialized
        grouped[key].push(e)
    }

    const rows: {
        date: string
        desc: string
        start: string
        end: string
        total: string
    }[] = []

    // Iterate through grouped entries
    for (const dateKey of Object.keys(grouped).sort()) {
        const dayEntries = grouped[dateKey] ?? [] // ✅ safe fallback
        let total = 0

        for (const e of dayEntries) {
            const start = new Date(e.timeInterval.start)
            const end = new Date(e.timeInterval.end)
            const dur = (end.getTime() - start.getTime()) / 1000
            total += dur

            rows.push({
                date: start.toLocaleDateString(),
                desc: e.description,
                start: start.toLocaleTimeString(),
                end: end.toLocaleTimeString(),
                total: secondsToDuration(dur)
            })
        }

        rows.push({
            date: '',
            desc: `Total for ${new Date(dateKey).toLocaleDateString()}`,
            start: '',
            end: '',
            total: secondsToDuration(total)
        })
    }

    return rows
}

const previewHtml = computed(() => {
    const rows = groupAndFormatEntries()
    if (rows.length === 0) return '<p>No entries.</p>'
    let html = `
    <table border="1" style="border-collapse:collapse;width:100%;text-align:center;">
      <tr><th colspan="5" style="background:#E2EFDA; padding:6px">Weekly Accomplishment Report</th></tr>
      <tr><th colspan="5" style="background:#E2EFDA; padding:6px">Period covered: ${startDate.value || 'N/A'} - ${endDate.value || 'N/A'}</th></tr>
      <tr style="background:#E2EFDA;">
        <th style="padding:6px">Date Entered</th><th style="padding:6px">Description</th><th style="padding:6px">Start Time</th><th style="padding:6px">End Time</th><th style="padding:6px">Total Time</th>
      </tr>`
    for (const r of rows) {
        const bg = r.desc.includes('Total for') ? ' style="background:#E2EFDA;"' : ''
        html += `<tr${bg}><td style="padding:6px">${r.date}</td><td style="padding:6px">${r.desc}</td><td style="padding:6px">${r.start}</td><td style="padding:6px">${r.end}</td><td style="padding:6px">${r.total}</td></tr>`
    }
    html += '</table>'
    return html
})

/* 5. Export Excel */
async function exportExcel() {
    const data = groupAndFormatEntries()
    if (data.length === 0) return alert('No entries to export')

    const workbook = new ExcelJS.Workbook()
    const ws = workbook.addWorksheet('TimeEntries')

    ws.columns = [
        { key: 'date', width: 16.88 },
        { key: 'desc', width: 53.13 },
        { key: 'start', width: 14.38 },
        { key: 'end', width: 14.38 },
        { key: 'total', width: 14.38 }
    ]

    const titleRow = ws.addRow(['Weekly Accomplishment Report'])
    ws.mergeCells('A1:E1')
    titleRow.eachCell((c) => {
        c.font = { bold: true, size: 14 }
        c.alignment = { horizontal: 'center' }
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2EFDA' } }
    })

    const periodRow = ws.addRow([`Period covered: ${startDate.value || 'N/A'} - ${endDate.value || 'N/A'}`])
    ws.mergeCells('A2:E2')
    periodRow.eachCell((c) => {
        c.font = { bold: true, size: 12 }
        c.alignment = { horizontal: 'center' }
        c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2EFDA' } }
    })

    ws.addRow(['Date Entered', 'Description', 'Start Time', 'End Time', 'Total Time'])
        .eachCell((c) => {
            c.font = { bold: true }
            c.alignment = { horizontal: 'center' }
            c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2EFDA' } }
        })

    for (const r of data) ws.addRow([r.date, r.desc, r.start, r.end, r.total])

    ws.eachRow({ includeEmpty: false }, (row, n) => {
        if (n >= 4 && row.getCell(2).value?.toString().includes('Total for')) {
            row.eachCell((c) => {
                c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2EFDA' } }
            })
        }
    })

    const buf = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${exportFileName.value}.xlsx`
    a.click()
    URL.revokeObjectURL(url)
}

/* Auto-update export file name */
watch(startDate, (v) => {
    if (v)
        exportFileName.value = `Accomplishment Report (${new Date(v).toLocaleDateString()} Week#) - Last Name, First Name`
})
</script>