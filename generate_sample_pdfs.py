import os
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

def create_sample_pdfs():
    dirs = [
        r"d:\Softsins\Bid new\sample_pdfs",
        r"d:\Softsins\Bid new\public\sample_pdfs"
    ]
    for d in dirs:
        os.makedirs(d, exist_ok=True)

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#003366')
    )
    h2_style = ParagraphStyle(
        'DocH2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor('#006db8')
    )
    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#222222')
    )
    callout_style = ParagraphStyle(
        'DocCallout',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#990000')
    )

    # -------------------------------------------------------------
    # 1. ARCHITECTURAL PDF (A-101)
    # -------------------------------------------------------------
    for target_dir in dirs:
        pdf_path = os.path.join(target_dir, "Sample_1_Architectural_Floor_Plan_A101.pdf")
        doc = SimpleDocTemplate(pdf_path, pagesize=letter, leftMargin=36, rightMargin=36, topMargin=36, bottomMargin=36)
        story = []

        story.append(Paragraph("🏗️ BIDPILOT AI — COMMERCIAL SPECIFICATION & DRAWING SET", h2_style))
        story.append(Paragraph("PROJECT: METRO CITY MEDICAL CENTER EXPANSION", title_style))
        story.append(Paragraph("<b>Drawing Sheet:</b> A-101 | <b>Discipline:</b> Architectural (CSI Division 01 & 09) | <b>Revision:</b> Rev 1 — Issue for Bid", body_style))
        story.append(Spacer(1, 10))

        # Metadata table
        meta_data = [
            ["Architect of Record:", "Perkins & Will Commercial Architects", "Date:", "August 12, 2026"],
            ["General Contractor:", "Turner / Mortenson Joint Venture", "Gross Area:", "145,000 GSF"],
            ["Bid Package:", "BP-03 Architectural Interiors & Partitions", "Target Bid Date:", "September 15, 2026"]
        ]
        t_meta = Table(meta_data, colWidths=[120, 210, 80, 130])
        t_meta.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0f4f8')),
            ('TEXTCOLOR', (0,0), (-1,-1), colors.HexColor('#1e293b')),
            ('FONTNAME', (0,0), (-1,-1), 'Helvetica-Bold'),
            ('FONTSIZE', (0,0), (-1,-1), 8.5),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#94a3b8')),
            ('PADDING', (0,0), (-1,-1), 4),
        ]))
        story.append(t_meta)
        story.append(Spacer(1, 12))

        story.append(Paragraph("1. ARCHITECTURAL ROOM & WALL SCHEDULE (LEVEL 1 PODIUM)", h2_style))
        room_data = [
            ["Room #", "Room Name", "Area (SF)", "Wall Type", "Acoustical STC", "Finish Spec"],
            ["101", "Emergency Triage A", "450 SF", "Type W4 (2-Hr Rated)", "STC 55 Sound Bead", "09 29 00 Gypsum Board"],
            ["102", "Trauma Suite 1", "720 SF", "Type W5 Lead Lined", "STC 60 Lead Shielded", "13 49 00 Radiation Shielding"],
            ["103", "Imaging / CT Scan", "680 SF", "Type W5 Lead Lined", "STC 60 Acoustical", "13 49 00 Lead Glass Viewports"],
            ["104", "Clean Supply Core", "320 SF", "Type W2 Standard", "STC 45 Perimeter Bead", "09 91 23 Antimicrobial Paint"],
            ["105", "Staff Breakroom", "540 SF", "Type W1 Partition", "STC 45 Sound Insulation", "09 65 00 Resilient Flooring"]
        ]
        t_rooms = Table(room_data, colWidths=[55, 140, 65, 110, 100, 110])
        t_rooms.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#003366')),
            ('TEXTCOLOR', (0,0), (-1,0), colors.white),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('FONTSIZE', (0,0), (-1,-1), 8),
            ('ALIGN', (0,0), (-1,-1), 'LEFT'),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
            ('PADDING', (0,0), (-1,-1), 4),
        ]))
        story.append(t_rooms)
        story.append(Spacer(1, 12))

        story.append(Paragraph("2. SPECIFICATION DISCREPANCY & SCOPE NOTES (KEYNOTES)", h2_style))
        story.append(Paragraph("• <b>KN-01:</b> Floor plan callout tag A-14 requires UL Design U465 perimeter sound sealant beads at all 2-hour corridor demising partitions.", body_style))
        story.append(Paragraph("• <b>KN-02:</b> Ceiling height is 10'-0\" AFF in corridors, 9'-0\" AFF in patient treatment areas. Gypsum board ceiling assemblies per Spec Section 09 22 16.", body_style))
        story.append(Paragraph("• <b>KN-03 (Addendum Note Δ1):</b> Add acoustic damping baffles above ceiling grid along grid lines 4 through 8.", callout_style))
        story.append(Spacer(1, 10))

        doc.build(story)

    # -------------------------------------------------------------
    # 2. ELECTRICAL POWER & GENERATOR PLAN (E-401)
    # -------------------------------------------------------------
    for target_dir in dirs:
        pdf_path = os.path.join(target_dir, "Sample_2_Electrical_Power_Plan_E401.pdf")
        doc = SimpleDocTemplate(pdf_path, pagesize=letter, leftMargin=36, rightMargin=36, topMargin=36, bottomMargin=36)
        story = []

        story.append(Paragraph("⚡ BIDPILOT AI — ELECTRICAL & EMERGENCY POWER BID PACKAGE", h2_style))
        story.append(Paragraph("PROJECT: METRO CITY MEDICAL CENTER EXPANSION", title_style))
        story.append(Paragraph("<b>Drawing Sheet:</b> E-401 | <b>Discipline:</b> Electrical (CSI Division 26) | <b>Addendum:</b> Addendum #1 Revision", body_style))
        story.append(Spacer(1, 10))

        # Key notice box
        alert_data = [
            ["⚠️ VISION DIFF DETECTED CHANGE:", "Emergency Standby Diesel Generator Fuel Feed Piping Scope Add (+$42,000 Cost Impact). Spec Section 26 32 13 §1.04.D strictly requires UL-142 listed double-wall containment with leak detection probes."]
        ]
        t_alert = Table(alert_data, colWidths=[160, 380])
        t_alert.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#fef2f2')),
            ('TEXTCOLOR', (0,0), (-1,-1), colors.HexColor('#991b1b')),
            ('FONTNAME', (0,0), (-1,-1), 'Helvetica-Bold'),
            ('FONTSIZE', (0,0), (-1,-1), 8.5),
            ('BOX', (0,0), (-1,-1), 1.5, colors.HexColor('#ef4444')),
            ('PADDING', (0,0), (-1,-1), 6),
        ]))
        story.append(t_alert)
        story.append(Spacer(1, 12))

        story.append(Paragraph("1. STANDBY POWER & SWITCHGEAR SCHEDULE", h2_style))
        elec_data = [
            ["Tag ID", "Equipment Description", "Rating / Voltage", "Fuel / Feed Type", "CSI Code", "PCO Status"],
            ["GEN-1", "Standby Diesel Generator #1", "1,500 kW / 480V 3Ø", "Dual-Wall Diesel Piping", "26 32 13", "Promoted PCO #04"],
            ["GEN-2", "Standby Diesel Generator #2", "1,500 kW / 480V 3Ø", "Dual-Wall Diesel Piping", "26 32 13", "Promoted PCO #04"],
            ["ATS-1", "Automatic Transfer Switch - Life Safety", "2000A 4-Pole 480V", "Bypass Isolation", "26 36 23", "Approved"],
            ["MDS-1", "Main Distribution Switchboard", "4000A 480V 65kAIC", "Copper Busbars (AA-8000)", "26 24 13", "Approved"],
            ["PANEL-EM1", "Emergency Critical Branch Panel", "400A 208Y/120V", "100% Solid Copper Wire", "26 24 16", "Approved"]
        ]
        t_elec = Table(elec_data, colWidths=[60, 160, 100, 110, 50, 100])
        t_elec.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0f766e')),
            ('TEXTCOLOR', (0,0), (-1,0), colors.white),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('FONTSIZE', (0,0), (-1,-1), 8),
            ('ALIGN', (0,0), (-1,-1), 'LEFT'),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
            ('PADDING', (0,0), (-1,-1), 4),
        ]))
        story.append(t_elec)
        story.append(Spacer(1, 12))

        story.append(Paragraph("2. ELECTRICAL SPECIFICATION CITATIONS & MANDATES", h2_style))
        story.append(Paragraph("• <b>Spec Section 26 05 19:</b> All branch circuits #10 AWG and smaller must use 100% solid copper conductors with THHN/THWN-2 90°C insulation.", body_style))
        story.append(Paragraph("• <b>Spec Section 26 24 13:</b> Main service entrance switchboards must have minimum 65kAIC short-circuit withstand rating and ground fault protection.", body_style))
        story.append(Paragraph("• <b>Spec Section 26 32 13:</b> Emergency generator exhaust must route through dual-chamber critical-grade silencers with seismic spring isolators.", body_style))
        story.append(Spacer(1, 10))

        doc.build(story)

    # -------------------------------------------------------------
    # 3. STRUCTURAL CONCRETE & FOUNDATION PLAN (S-201)
    # -------------------------------------------------------------
    for target_dir in dirs:
        pdf_path = os.path.join(target_dir, "Sample_3_Structural_Foundation_Plan_S201.pdf")
        doc = SimpleDocTemplate(pdf_path, pagesize=letter, leftMargin=36, rightMargin=36, topMargin=36, bottomMargin=36)
        story = []

        story.append(Paragraph("🏛️ BIDPILOT AI — STRUCTURAL ENGINEERING & CONCRETE SET", h2_style))
        story.append(Paragraph("PROJECT: METRO CITY MEDICAL CENTER EXPANSION", title_style))
        story.append(Paragraph("<b>Drawing Sheet:</b> S-201 | <b>Discipline:</b> Structural (CSI Division 03) | <b>Scope:</b> Foundation Slab & Shear Core", body_style))
        story.append(Spacer(1, 10))

        # Structural Spec Table
        struct_data = [
            ["Structural Element", "Concrete Mix Class", "Compressive Strength (f'c)", "Water-Cement Ratio", "Rebar Grade"],
            ["Main Podium Mat Slab", "Class A-1 High Strength", "6,000 PSI @ 28 Days", "Max 0.40 W/C", "ASTM A615 Grade 60 (#8)"],
            ["Core Shear Walls (SW-1)", "Class S-Core Self-Consolidating", "6,000 PSI @ 28 Days", "Max 0.38 W/C + Silica Fume", "ASTM A706 Seismic Rebar"],
            ["Perimeter Basement Walls", "Class B Waterproofed", "4,500 PSI @ 28 Days", "Max 0.45 W/C + Crystalline", "Grade 60 (#6 @ 12\" OC)"],
            ["Interior Isolated Footings", "Class C Standard", "4,000 PSI @ 28 Days", "Max 0.45 W/C", "Grade 60 (#7 Top & Btm)"],
            ["Elevated Post-Tensioned Slab", "Class PT-5000", "5,000 PSI @ 28 Days", "Max 0.42 W/C", "0.5\" Unbonded PT Tendons"]
        ]
        t_struct = Table(struct_data, colWidths=[130, 110, 110, 100, 110])
        t_struct.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1e3a8a')),
            ('TEXTCOLOR', (0,0), (-1,0), colors.white),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('FONTSIZE', (0,0), (-1,-1), 8),
            ('ALIGN', (0,0), (-1,-1), 'LEFT'),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
            ('PADDING', (0,0), (-1,-1), 4),
        ]))
        story.append(t_struct)
        story.append(Spacer(1, 12))

        story.append(Paragraph("1. STRUCTURAL CONCRETE GENERAL NOTES (CSI 03 30 00)", h2_style))
        story.append(Paragraph("• <b>Note 01:</b> All cast-in-place concrete shall be placed in accordance with ACI 301 and ACI 318. Slump range 4\" ± 1\" before superplasticizer.", body_style))
        story.append(Paragraph("• <b>Note 02:</b> Curing compound must comply with ASTM C309 Type 1, Class B. Continuous wet cure required for minimum 7 days on podium slabs.", body_style))
        story.append(Paragraph("• <b>Note 03:</b> Discrepancy Flag: S-001 general note previously listed 4,000 PSI; S-201 supersedes with 6,000 PSI high-strength concrete for shear walls.", callout_style))
        story.append(Spacer(1, 10))

        doc.build(story)

    print("All 3 Sample PDFs created successfully in sample_pdfs and public/sample_pdfs!")

if __name__ == "__main__":
    create_sample_pdfs()
