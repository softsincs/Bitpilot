import os
import sys
import time
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, BaseDocTemplate, PageTemplate, Frame
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

# ----------------------------------------------------------------------
# Clean Canvas Callback for Header & Footer (No double-pass stream bugs)
# ----------------------------------------------------------------------
def add_header_footer(canvas_obj, doc):
    canvas_obj.saveState()
    page_num = canvas_obj.getPageNumber()
    
    # Don't draw running header on cover page
    if page_num > 1:
        canvas_obj.setFont("Helvetica", 7.5)
        canvas_obj.setFillColor(colors.HexColor("#475569"))
        
        # Header Top Border
        canvas_obj.setStrokeColor(colors.HexColor("#cbd5e1"))
        canvas_obj.setLineWidth(0.6)
        canvas_obj.line(36, 756, 576, 756)
        canvas_obj.drawString(36, 762, "BIDPILOT AI — COMMERCIAL ESTIMATING COPILOT | 100% BID SET SPECIFICATION")
        canvas_obj.drawRightString(576, 762, "PROJECT: GRANDVIEW HORIZON RESEARCH TOWER")
        
        # Footer Bottom Border
        canvas_obj.line(36, 42, 576, 42)
        canvas_obj.drawString(36, 30, "CONFIDENTIAL COMMERCIAL BID DOCUMENTS — CSI MASTERFORMAT COMPLIANT")
        canvas_obj.drawRightString(576, 30, f"Page {page_num} of 500")
        
    canvas_obj.restoreState()


def generate_clean_500_page_pdf(output_paths):
    start_time = time.time()
    print("Generating 500 unique, clean, non-overlapping commercial construction pages...")

    for path in output_paths:
        os.makedirs(os.path.dirname(path), exist_ok=True)

    primary_path = output_paths[0]
    
    # Exact printable frame calculation:
    # Page is 612 x 792 (Letter)
    # Margins: Left=36, Right=36, Top=45, Bottom=48 -> Printable width = 540 pt, height = 699 pt
    doc = SimpleDocTemplate(
        primary_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=42,
        bottomMargin=45
    )

    styles = getSampleStyleSheet()

    # Refined Styles
    cover_title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0f172a'),
        alignment=1
    )
    cover_sub_style = ParagraphStyle(
        'CoverSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#334155'),
        alignment=1
    )
    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=colors.HexColor('#003366'),
        spaceAfter=3
    )
    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor('#1e293b')
    )
    callout_style = ParagraphStyle(
        'Callout',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor('#991b1b')
    )

    story = []

    # =========================================================================
    # PAGE 1: COVER PAGE
    # =========================================================================
    story.append(Spacer(1, 30))
    story.append(Paragraph("🏗️ BIDPILOT AI — COMMERCIAL SPECIFICATION & DRAWING BID SET", cover_title_style))
    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>GRANDVIEW HORIZON RESEARCH TOWER & MEDICAL PAVILION</b>", cover_sub_style))
    story.append(Paragraph("750,000 GSF Commercial Class-A 32-Story Medical Tower | Austin, Texas", cover_sub_style))
    story.append(Spacer(1, 16))

    cover_meta = [
        ["Project Owner:", "Grandview Health Sciences Real Estate Trust LLC"],
        ["Architect of Record:", "Perkins & Will / AECOM Joint Commercial Studio"],
        ["Lead Structural Engineer:", "Thornton Tomasetti Structural Engineers"],
        ["MEP / FP Engineer:", "WSP Global MEP Consulting Engineers"],
        ["General Contractor / CM:", "Turner-Mortenson Pre-Construction Joint Venture"],
        ["Bid Submission Deadline:", "September 30, 2026 @ 14:00 CST"],
        ["Issued Set Stage:", "100% Construction Documents (Issue For Bid - Rev 2)"],
        ["Total Specification Set:", "500 Complete Indexed Pages (Divisions 00-48 + CAD Schedules)"]
    ]
    t_cov = Table(cover_meta, colWidths=[160, 380])
    t_cov.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('TEXTCOLOR', (0,0), (0,-1), colors.HexColor('#0f172a')),
        ('FONTNAME', (0,0), (0,-1), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 8),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('BOX', (0,0), (-1,-1), 1.5, colors.HexColor('#0284c7')),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_cov)
    story.append(Spacer(1, 16))

    # Executive Overview Box
    exec_box = [
        ["PROJECT BIDDING NOTICE & SPECIFICATION COMPLIANCE PROTOCOL"],
        ["This document contains 500 fully indexed pages covering architectural, structural, civil, mechanical, electrical, and plumbing engineering requirements. Each page has been formatted for sub-second pgvector indexing, OCR extraction, and multi-discipline cross-referencing in the BidPilot AI workspace."]
    ]
    t_exec = Table(exec_box, colWidths=[540])
    t_exec.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#003366')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 8),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('BACKGROUND', (0,1), (-1,1), colors.HexColor('#eff6ff')),
        ('TEXTCOLOR', (0,1), (-1,1), colors.HexColor('#1e3a8a')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#3b82f6')),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_exec)
    story.append(Spacer(1, 14))

    # Master Division Index Summary on Cover
    div_summary = [
        ["CSI Division Range", "Scope Discipline", "Assigned Lead Trade Package", "Page Count"],
        ["Divisions 00 - 01", "Procurement & General Requirements", "General Contractor Core", "Pages 2 - 40"],
        ["Divisions 02 - 05", "Demolition, Concrete, Masonry & Steel", "Structural Trade Packages", "Pages 41 - 150"],
        ["Divisions 06 - 09", "Interiors, Finishes, Openings & Envelope", "Architectural Specialty Trades", "Pages 151 - 270"],
        ["Divisions 14 - 23", "Conveying, Fire Suppression, Plumbing & HVAC", "MEP / FP Trade Subcontractors", "Pages 271 - 380"],
        ["Divisions 26 - 28", "Electrical, Generators, Low Voltage & Security", "Electrical Prime Contractors", "Pages 381 - 440"],
        ["Divisions 31 - 33", "Civil, Earthwork, Utilities & Addenda Logs", "Civil Trade & Estimating Review", "Pages 441 - 500"]
    ]
    t_div_sum = Table(div_summary, colWidths=[110, 210, 150, 70])
    t_div_sum.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0f172a')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 7.5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#f8fafc')]),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#94a3b8')),
        ('PADDING', (0,0), (-1,-1), 3.5),
    ]))
    story.append(t_div_sum)
    story.append(PageBreak())

    # =========================================================================
    # PAGES 2 TO 500: UNIQUE STRUCTURED TECHNICAL PAGES
    # =========================================================================
    # We define rich discipline data banks to ensure every page has unique data.
    csi_master_data = [
        # (DivCode, DivName, [Sections])
        ("00", "Procurement and Contracting", [
            ("00 11 13", "Advertisement for Bids", "Mandatory pre-bid conference and site walk registration requirements."),
            ("00 21 13", "Instructions to Bidders", "Subcontractor pre-qualification criteria, bonding capacity, and safety EMR thresholds."),
            ("00 31 19", "Existing Condition Information", "Geotechnical boring reports, subterranean groundwater data, and bedrock elevations."),
            ("00 41 13", "Bid Form & Supplements", "Base bid stip sum proposal, allowance schedules, and alternate pricing breakdowns."),
            ("00 72 00", "General Conditions", "AIA A201-2017 standard general conditions, retainage terms (5%), and payment applications."),
            ("00 73 16", "Insurance Requirements", "Commercial general liability ($25M aggregate), excess umbrella, and pollution liability.")
        ]),
        ("01", "General Requirements", [
            ("01 10 00", "Summary of Work", "Phased construction sequencing, tower crane logistics, and municipal right-of-way usage."),
            ("01 25 00", "Substitution Procedures", "Prior-approval timelines for equal products, documentation standards, and warranty match."),
            ("01 31 00", "Project Management & Coordination", "Navisworks BIM clash detection (LOD 400), weekly coordination milestones."),
            ("01 32 16", "Construction Progress Schedule", "Critical path method scheduling in Primavera P6, baseline logic, and monthly updates."),
            ("01 33 00", "Submittal Procedures", "Action submittals, digital review stamps, fabrication lead-time tracking."),
            ("01 40 00", "Quality Requirements", "Independent testing laboratory certified inspectors, non-conformance logs."),
            ("01 50 00", "Temporary Facilities & Controls", "Temporary power distribution, temporary heat, hoists, and perimeter security."),
            ("01 77 00", "Closeout Procedures", "Final punch list, O&M manuals, attic stock materials, and warranty start dates.")
        ]),
        ("02", "Existing Conditions", [
            ("02 41 16", "Structure Demolition", "Selective demolition of existing basement retaining structures and asphalt pavement."),
            ("02 82 00", "Asbestos Remediation", "Air monitoring protocol, containment zones, and certified disposal documentation.")
        ]),
        ("03", "Concrete", [
            ("03 10 00", "Concrete Forming & Accessories", "Self-climbing jump forms for core elevator walls, column formwork tolerances."),
            ("03 20 00", "Concrete Reinforcing", "ASTM A615 Grade 60 rebar, epoxy-coated bars in parking slabs, mechanical splices."),
            ("03 30 00", "Cast-in-Place Concrete", "8,000 PSI high-strength core mix, 5,000 PSI podium slabs, fly-ash sustainability mix."),
            ("03 38 00", "Post-Tensioned Concrete", "Unbonded post-tensioning tendons, elongation verification, and stressing logs."),
            ("03 54 16", "Hydraulic Cement Underlayment", "Self-leveling floor underlayment achieving FF 50 / FL 35 floor flatness.")
        ]),
        ("04", "Masonry", [
            ("04 20 00", "Unit Masonry", "8-inch and 12-inch reinforced CMU shaft walls, integral water repellent mortar."),
            ("04 42 00", "Exterior Dimension Stone Cladding", "Granite podium panels with stainless steel concealed clip anchor systems.")
        ]),
        ("05", "Metals", [
            ("05 12 00", "Structural Steel Framing", "ASTM A992 wide-flange beams, seismic moment frame connections, ultrasonic weld testing."),
            ("05 31 00", "Steel Decking", "3-inch composite galvanized metal floor deck, headed shear stud connectors."),
            ("05 40 00", "Cold-Formed Metal Framing", "Exterior heavy-gauge studs (16-gauge / 50ksi) engineered for 120 MPH wind loads."),
            ("05 51 00", "Metal Stairs & Railings", "Egress stair towers, monumental lobby open stair with glass balustrades.")
        ]),
        ("06", "Wood, Plastics, and Composites", [
            ("06 41 16", "Plastic-Laminate-Faced Cabinets", "AWI Premium grade architectural casework with quartz stone counters."),
            ("06 42 16", "Flush Wood Paneling", "Rift-cut white oak architectural wall paneling with Class-A fire-retardant core.")
        ]),
        ("07", "Thermal and Moisture Protection", [
            ("07 13 26", "Self-Adhering Sheet Waterproofing", "Sub-grade foundation wall waterproofing membrane with protection board."),
            ("07 21 00", "Thermal Insulation", "Continuous exterior mineral wool insulation (R-20 minimum) and cavity fire-safing."),
            ("07 27 26", "Fluid-Applied Air Barriers", "Vapor-permeable continuous air and moisture barrier system over exterior sheathing."),
            ("07 52 16", "Modified Bituminous Membrane Roofing", "Multi-ply SBS cool roof system, tapered polyiso insulation, 30-year NDL warranty."),
            ("07 84 13", "Penetration Firestopping", "UL-listed 2-hour and 3-hour through-penetration firestop systems for MEP risers."),
            ("07 92 00", "Joint Sealants", "High-performance structural silicone and polyurethane joint sealants.")
        ]),
        ("08", "Openings", [
            ("08 11 13", "Hollow Metal Doors & Frames", "Level 3 extra-heavy duty 16-gauge welded frames with galvanized rust primer."),
            ("08 14 16", "Flush Wood Doors", "90-minute fire-rated wood veneer doors with acoustic drop seals."),
            ("08 44 13", "Glazed Aluminum Curtain Walls", "Unitized thermally broken curtain wall system with triple-pane Low-E Solarban 70 glass."),
            ("08 71 00", "Door Hardware", "Commercial mortise locksets, electrified panic exit bars, card reader integration."),
            ("08 88 13", "Fire-Rated Glazing", "Pyrostop 120-minute clear fire safety glass installed in main lobby atriums.")
        ]),
        ("09", "Finishes", [
            ("09 22 16", "Non-Structural Metal Framing", "25-gauge interior partition studs with acoustic isolation resilient channels."),
            ("09 29 00", "Gypsum Board Systems", "5/8-inch Type X firecode gypsum board, Level 5 finish throughout executive suites."),
            ("09 30 13", "Ceramic & Porcelain Tiling", "Large format 24x48 porcelain slabs in restrooms and main lobby elevator corridors."),
            ("09 51 13", "Acoustical Panel Ceilings", "MicroLook 2x2 tegular ceiling tiles with NRC 0.85 and CAC 38 acoustical rating."),
            ("09 65 00", "Resilient Flooring", "Commercial luxury vinyl tile (LVT) with 28-mil commercial wear layer."),
            ("09 68 13", "Tile Carpeting", "Solution-dyed modular carpet tiles with recycled cushion backing."),
            ("09 91 23", "Interior Painting", "Zero-VOC antimicrobial commercial coatings and epoxy coatings in mechanical rooms.")
        ]),
        ("14", "Conveying Equipment", [
            ("14 21 00", "Electric Traction Elevators", "8-car passenger destination dispatch elevator bank operating at 1,000 FPM."),
            ("14 24 00", "Hydraulic Freight Elevators", "10,000 lb capacity service elevator serving loading dock to Level 32 mechanical room.")
        ]),
        ("21", "Fire Suppression", [
            ("21 13 13", "Wet-Pipe Sprinkler Systems", "NFPA 13 compliant automatic fire sprinkler system with quick-response concealed heads."),
            ("21 30 00", "Fire Pumps", "1,500 GPM @ 180 PSI electric centrifugal fire pump with diesel backup auxiliary pump.")
        ]),
        ("22", "Plumbing", [
            ("22 05 29", "Hangers & Supports for Plumbing", "Seismic restraint bracing (Zone D) for domestic water and drainage risers."),
            ("22 11 16", "Domestic Water Piping", "Type L hard-drawn copper piping, commercial water pressure booster pump system."),
            ("22 40 00", "Commercial Plumbing Fixtures", "Low-flow electronic sensor flush valves (1.28 GPF) and ADA-compliant lavatories.")
        ]),
        ("23", "Heating, Ventilating, and Air Conditioning (HVAC)", [
            ("23 05 93", "Testing, Adjusting, and Balancing", "NEBB / AABC certified TAB agency for air and hydronic water flow balancing."),
            ("23 09 23", "Building Automation System (BAS)", "Direct digital controls with BACnet/IP protocol connected to central engineering server."),
            ("23 21 13", "Hydronic Piping", "Schedule 40 seamless carbon steel chilled water risers and grooved mechanical fittings."),
            ("23 64 26", "Water-Cooled Chillers", "3x 800-ton magnetic bearing centrifugal chillers with variable frequency drives."),
            ("23 74 13", "Custom Dedicated Outdoor Air Systems", "100% outside air DOAS units with total enthalpy energy recovery wheels.")
        ]),
        ("26", "Electrical", [
            ("26 05 19", "Low-Voltage Conductors", "THHN/THWN-2 copper conductors in EMT conduit, aluminum wiring strictly prohibited."),
            ("26 12 00", "Medium-Voltage Unit Substations", "13.8kV primary to 480/277V step-down dry-type substation transformers."),
            ("26 24 16", "Main Switchboards", "4,000A main service switchboard with integrated digital power quality metering."),
            ("26 32 13", "Diesel Emergency Generator", "2,500 kW standby diesel generator with 72-hour sub-base dual-containment fuel storage."),
            ("26 36 00", "Automatic Transfer Switches", "Closed-transition bypass isolation ATS with emergency load prioritization."),
            ("26 51 19", "LED Interior Lighting", "High-efficacy LED fixtures with 0-10V dimming and integrated daylight harvesting sensors.")
        ]),
        ("27", "Communications", [
            ("27 10 00", "Structured Cabling", "Category 6A shielded cable infrastructure, 24-strand OM4 fiber backbone risers.")
        ]),
        ("28", "Electronic Safety and Security", [
            ("28 31 11", "Digital Addressable Fire Alarm", "Class-A addressable voice evacuation fire alarm system with smoke control sequencing.")
        ]),
        ("31", "Earthwork", [
            ("31 20 00", "Earth Moving & Excavation", "Mass basement excavation (85,000 CY), engineered fill compaction, and shoring tiebacks.")
        ]),
        ("32", "Exterior Improvements", [
            ("32 12 16", "Asphalt & Concrete Paving", "Heavy-duty truck aprons and pervious decorative concrete pedestrian walkways."),
            ("32 90 00", "Landscaping & Irrigation", "Native drought-tolerant landscaping with central weather-based smart irrigation controllers.")
        ])
    ]

    total_divs = len(csi_master_data)

    for p in range(2, 501):
        # Pick CSI division & section cleanly
        div_idx = (p - 2) % total_divs
        div_code, div_name, sections = csi_master_data[div_idx]
        sec_idx = ((p - 2) // total_divs) % len(sections)
        sec_num, sec_title, sec_desc = sections[sec_idx]

        # Header Title Bar
        header_table = [
            [f"SPECIFICATION SECTION {sec_num} — {sec_title.upper()}", f"CSI DIVISION {div_code}"]
        ]
        t_hdr = Table(header_table, colWidths=[410, 130])
        t_hdr.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#003366')),
            ('TEXTCOLOR', (0,0), (-1,-1), colors.white),
            ('FONTNAME', (0,0), (-1,-1), 'Helvetica-Bold'),
            ('FONTSIZE', (0,0), (-1,-1), 8),
            ('ALIGN', (1,0), (1,-1), 'RIGHT'),
            ('PADDING', (0,0), (-1,-1), 3.5),
        ]))
        story.append(t_hdr)
        story.append(Spacer(1, 6))

        # Page Sub-type rotation:
        # 0: Architectural/Engineering Technical Spec
        # 1: Equipment Matrix & Schedule Table
        # 2: Scope Gaps, Discrepancies & AI Auto-RFI
        # 3: Trade Bill of Quantities (BOQ) & Estimator Spread
        page_type = p % 4

        if page_type == 0:
            story.append(Paragraph(f"<b>PART 1 — GENERAL & PERFORMANCE REQUIREMENTS</b>", h2_style))
            story.append(Paragraph(
                f"<b>1.01 SUMMARY:</b> Section includes requirements for furnishing, installation, and certified testing of {sec_title}. "
                f"{sec_desc} All work shall conform to Contract Documents, local building codes, and Division 01 General Requirements.",
                body_style
            ))
            story.append(Spacer(1, 3))
            story.append(Paragraph(
                f"<b>1.02 SUBMITTALS & SHOP DRAWINGS:</b> Submit Product Data, certified test reports, manufacturer installation instructions, and BIM LOD 400 fabrication models within 30 days of Notice to Proceed.",
                body_style
            ))
            story.append(Spacer(1, 5))

            story.append(Paragraph(f"<b>PART 2 — MATERIALS & APPROVED MANUFACTURERS</b>", h2_style))
            mat_rows = [
                ["Item Ref", "Material / Component", "Performance Standard", "Approved Manufacturer", "QC Test Freq."],
                [f"SPEC-{p:03d}-01", f"{sec_title} Assembly", "ASTM / ANSI Grade A", "Basis of Design / Equal", "1 per Batch"],
                [f"SPEC-{p:03d}-02", "Corrosion Protective Coating", "SSPC-SP 10 / NACE 2", "Sherwin-Williams / Tnemec", "Visual + Mil Gauge"],
                [f"SPEC-{p:03d}-03", "Seismic Bracing Assembly", "IBC 2024 Category D", "Hilti / Unistrut", "100% Anchor Torque"],
                [f"SPEC-{p:03d}-04", "Fire & Acoustic Seal Core", "UL 2-Hour Rated / STC 55", "3M / Specified Tech Inc.", "Continuous Inspection"]
            ]
            t_mat = Table(mat_rows, colWidths=[70, 150, 110, 120, 90])
            t_mat.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0284c7')),
                ('TEXTCOLOR', (0,0), (-1,0), colors.white),
                ('FONTNAME', (0,0), (-1,-1), 'Helvetica'),
                ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
                ('FONTSIZE', (0,0), (-1,-1), 7),
                ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
                ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor('#cbd5e1')),
                ('PADDING', (0,0), (-1,-1), 3),
            ]))
            story.append(t_mat)
            story.append(Spacer(1, 5))

            story.append(Paragraph(f"<b>PART 3 — EXECUTION & FIELD QUALITY CONTROL</b>", h2_style))
            story.append(Paragraph(
                f"<b>3.01 INSTALLATION:</b> Install all components plumb, true, and securely anchored in accordance with approved shop drawings. "
                f"Tolerances shall not exceed 1/8-inch in 10 feet. Protect adjacent finished work from damage during erection.",
                body_style
            ))
            story.append(Spacer(1, 3))
            story.append(Paragraph(
                f"<b>3.02 COMMISSIONING:</b> Perform certified field performance testing prior to substantial completion. Provide 5-year comprehensive warranty.",
                body_style
            ))

        elif page_type == 1:
            floor_level = ((p % 32) + 1)
            story.append(Paragraph(f"<b>COMMERCIAL EQUIPMENT & QUANTITY SCHEDULE — LEVEL {floor_level:02d}</b>", h2_style))
            story.append(Paragraph(f"<b>Trade Discipline:</b> {div_name} | <b>Drawing Reference:</b> Sheet {div_code}-{p:03d} | <b>Sector:</b> High-Rise Core", body_style))
            story.append(Spacer(1, 5))

            sched_rows = [
                ["Tag ID", "Equipment / Component Description", "Location", "Qty", "Unit Cost", "Ext. Total", "Trade Sub"]
            ]
            for i in range(1, 8):
                qty = (i * 3) + (p % 5)
                unit_cost = 450 + (i * 120) + (p * 5)
                tot = qty * unit_cost
                sched_rows.append([
                    f"TAG-{p:02d}-{i:02d}",
                    f"Commercial {sec_title[:20]} Mod-{i}",
                    f"Level {floor_level:02d} Grid {chr(65+i)}-{i+2}",
                    f"{qty} EA",
                    f"${unit_cost:,.2f}",
                    f"${tot:,.2f}",
                    f"Div {div_code} Lead"
                ])

            t_sched = Table(sched_rows, colWidths=[65, 145, 95, 50, 65, 65, 55])
            t_sched.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#003366')),
                ('TEXTCOLOR', (0,0), (-1,0), colors.white),
                ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
                ('FONTSIZE', (0,0), (-1,-1), 7),
                ('ALIGN', (3,0), (5,-1), 'RIGHT'),
                ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#f8fafc')]),
                ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
                ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor('#94a3b8')),
                ('PADDING', (0,0), (-1,-1), 3),
            ]))
            story.append(t_sched)
            story.append(Spacer(1, 5))

            story.append(Paragraph(
                f"<b>ESTIMATOR COMPLIANCE NOTE:</b> Quantities shown reflect Net Plan Area. Subcontractor must cross-reference composite MEP BIM model and include seismic sway bracing per specification section {sec_num}.",
                body_style
            ))

        elif page_type == 2:
            story.append(Paragraph(f"<b>SCOPE GAP IDENTIFICATION & SPECIFICATION CONFLICT LOG</b>", h2_style))
            story.append(Paragraph(f"<b>AI Copilot Anomaly Scan:</b> Cross-discipline review between Section {sec_num} and Architectural Set Rev 2.", callout_style))
            story.append(Spacer(1, 5))

            gap_rows = [
                ["Conflict ID", "Drawing / Spec Ref", "Identified Scope Discrepancy", "Severity", "Cost Exposure", "Action Item"],
                [
                    f"GAP-{p:03d}-A",
                    f"Sheet {div_code}-{p:02d} vs {sec_num}",
                    f"Chilled water piping and electrical cable tray elevation conflict at corridor ceiling.",
                    "HIGH",
                    "+$38,500",
                    "Issue RFI requesting 6\" plenum drop."
                ],
                [
                    f"GAP-{p:03d}-B",
                    f"Spec {sec_num} §2.04",
                    f"Wall type schedule lists standard studs, but acoustic spec demands STC-55 rating.",
                    "CRITICAL",
                    "+$19,200",
                    "Add resilient isolation channel to bid."
                ],
                [
                    f"GAP-{p:03d}-C",
                    f"Addendum #02 Item {p%10+1}",
                    f"Emergency power branch circuit feed omitted in mechanical equipment connection schedule.",
                    "MEDIUM",
                    "+$42,000",
                    "Promote to PCO for owner review."
                ]
            ]
            t_gap = Table(gap_rows, colWidths=[60, 85, 175, 55, 65, 100])
            t_gap.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#991b1b')),
                ('TEXTCOLOR', (0,0), (-1,0), colors.white),
                ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
                ('FONTSIZE', (0,0), (-1,-1), 6.5),
                ('TEXTCOLOR', (3,1), (3,-1), colors.HexColor('#991b1b')),
                ('FONTNAME', (3,1), (3,-1), 'Helvetica-Bold'),
                ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#fca5a5')),
                ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor('#ef4444')),
                ('PADDING', (0,0), (-1,-1), 3),
            ]))
            story.append(t_gap)
            story.append(Spacer(1, 5))

            story.append(Paragraph(f"<b>FORMAL RFI DRAFT AUTO-GENERATED BY BIDPILOT AI</b>", h2_style))
            rfi_box = [
                [f"RFI NO: RFI-{p:03d} | PROJECT: GRANDVIEW RESEARCH TOWER | TO: ARCHITECT OF RECORD"],
                [f"<b>SUBJECT:</b> Coordination Clarification for {sec_title} ({sec_num})<br/>"
                 f"<b>QUESTION:</b> Specification {sec_num} specifies continuous seismic anchoring, whereas Structural Detail 4/S-502 illustrates standard friction clips. Please clarify which assembly governs the structural permit requirement.<br/>"
                 f"<b>CONTRACTOR RECOMMENDATION:</b> Utilize engineered seismic anchor assemblies per ASTM E488 to maintain full code compliance without schedule impact."]
            ]
            t_rfi = Table(rfi_box, colWidths=[540])
            t_rfi.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1e293b')),
                ('TEXTCOLOR', (0,0), (-1,0), colors.white),
                ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
                ('FONTSIZE', (0,0), (-1,-1), 7),
                ('BACKGROUND', (0,1), (-1,1), colors.HexColor('#f1f5f9')),
                ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor('#64748b')),
                ('PADDING', (0,0), (-1,-1), 4.5),
            ]))
            story.append(t_rfi)

        else:
            story.append(Paragraph(f"<b>BILL OF QUANTITIES (BOQ) & TRADE BID SPREAD MATRIX</b>", h2_style))
            story.append(Paragraph(f"<b>CSI Section:</b> {sec_num} — {sec_title} | <b>Package:</b> Commercial Class-A Construction", body_style))
            story.append(Spacer(1, 5))

            boq_rows = [
                ["Line #", "CSI Code", "Detailed Scope Description", "Unit", "Qty", "Labor ($)", "Mat. ($)", "Total Ext. ($)"],
                [f"{p}.01", sec_num, f"Furnish & Erect {sec_title[:24]}", "LS", "1", "45,000", "78,500", "123,500"],
                [f"{p}.02", sec_num, "Heavy Structural Bracing & Connections", "EA", "85", "14,400", "22,800", "37,200"],
                [f"{p}.03", sec_num, "Conduit, Feeds & Integrated Controls", "LF", "2,400", "28,000", "42,000", "70,000"],
                [f"{p}.04", sec_num, "Certified Testing & TAB Commissioning", "DAY", "4", "8,500", "1,500", "10,000"],
                [f"{p}.05", sec_num, "As-Built CAD Documentation & BIM LOD 400", "LS", "1", "6,500", "500", "7,000"],
                ["TOTAL", "", "COMBINED TRADE BID PACKAGE SUB-TOTAL", "", "", "$102,400", "$145,300", "$247,700"]
            ]
            t_boq = Table(boq_rows, colWidths=[38, 48, 184, 28, 42, 55, 65, 80])
            t_boq.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#003366')),
                ('TEXTCOLOR', (0,0), (-1,0), colors.white),
                ('FONTNAME', (0,0), (-1,-1), 'Helvetica'),
                ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
                ('FONTNAME', (0,-1), (-1,-1), 'Helvetica-Bold'),
                ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor('#e2e8f0')),
                ('FONTSIZE', (0,0), (-1,-1), 7),
                ('ALIGN', (4,0), (-1,-1), 'RIGHT'),
                ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
                ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor('#64748b')),
                ('PADDING', (0,0), (-1,-1), 2.8),
            ]))
            story.append(t_boq)
            story.append(Spacer(1, 5))

            story.append(Paragraph("<b>SUBCONTRACTOR BID SUBMISSION COMPLIANCE CHECKLIST:</b>", body_style))
            chk_rows = [
                ["[ X ] 100% Performance & Payment Bond Verified", "[ X ] EMR Safety Rating < 0.85 Certified"],
                ["[ X ] Addenda 1 Through 3 Fully Acknowledged", "[ X ] Prevailing Wage Davis-Bacon Rates Included"]
            ]
            t_chk = Table(chk_rows, colWidths=[270, 270])
            t_chk.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
                ('FONTSIZE', (0,0), (-1,-1), 7),
                ('TEXTCOLOR', (0,0), (-1,-1), colors.HexColor('#1e293b')),
                ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
                ('PADDING', (0,0), (-1,-1), 3),
            ]))
            story.append(t_chk)

        # PageBreak for all except page 500
        if p < 500:
            story.append(PageBreak())

    print("Building Document with native header/footer callback (zero stream doubling)...")
    doc.build(story, onFirstPage=add_header_footer, onLaterPages=add_header_footer)

    for path in output_paths[1:]:
        import shutil
        shutil.copyfile(primary_path, path)

    elapsed = time.time() - start_time
    file_size_mb = os.path.getsize(primary_path) / (1024 * 1024)
    print(f"SUCCESS! 500 Pages cleanly generated in {elapsed:.2f} seconds. File size: {file_size_mb:.2f} MB")


if __name__ == "__main__":
    out_dirs = [
        r"d:\Softsins\Bidpilot\sample_pdfs\Commercial_Project_500_Pages_Bid_Set.pdf",
        r"d:\Softsins\Bidpilot\public\sample_pdfs\Commercial_Project_500_Pages_Bid_Set.pdf"
    ]
    generate_clean_500_page_pdf(out_dirs)
